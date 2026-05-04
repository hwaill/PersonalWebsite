import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { writeClient } from '@/sanity/lib/writeClient';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.memberId !== id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const file = formData.get('photo') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    await writeClient.patch(id).set({
      photo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    }).commit();

    revalidatePath('/bookclub', 'layout');
    return NextResponse.json({ assetId: asset._id });
  } else {
    const body = await req.json().catch(() => ({}));
    const patch: Record<string, string> = {};
    if (typeof body.name === 'string' && body.name.trim()) patch.name = body.name.trim();
    if (typeof body.tagline === 'string') patch.tagline = body.tagline.trim();

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    await writeClient.patch(id).set(patch).commit();
    revalidatePath('/bookclub', 'layout');
    return NextResponse.json({ ok: true });
  }
}
