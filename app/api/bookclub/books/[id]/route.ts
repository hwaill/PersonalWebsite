import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { writeClient } from '@/sanity/lib/writeClient';

function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  return session?.isAdmin ? session : null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const file = formData.get('cover') as File | null;
    if (!file || file.size === 0) return NextResponse.json({ error: 'No file' }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    });
    await writeClient.patch(id).set({
      coverImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    }).commit();
    revalidatePath('/bookclub', 'layout');
    return NextResponse.json({ ok: true });
  }

  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (typeof body.title === 'string' && body.title.trim()) patch.title = body.title.trim();
  if (typeof body.author === 'string' && body.author.trim()) patch.author = body.author.trim();
  if (typeof body.genre === 'string') patch.genre = body.genre || null;
  if (typeof body.pages === 'number' && body.pages > 0) patch.pages = body.pages;
  if (typeof body.yearPublished === 'number' && body.yearPublished > 0) patch.yearPublished = body.yearPublished;
  if (typeof body.inProgress === 'boolean') patch.inProgress = body.inProgress;
  if (typeof body.dateCompleted === 'string') patch.dateCompleted = body.dateCompleted || null;

  let patchBuilder = writeClient.patch(id).set(patch);

  if (body.mvpId === null) {
    patchBuilder = patchBuilder.unset(['mvp']);
  } else if (typeof body.mvpId === 'string') {
    patchBuilder = patchBuilder.set({ mvp: { _type: 'reference', _ref: body.mvpId } });
  }

  await patchBuilder.commit();
  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await writeClient.delete(id);
  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ ok: true });
}
