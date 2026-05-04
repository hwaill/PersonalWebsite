import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';

async function getSession(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return token ? verifySession(token) : null;
}

async function assertOwnership(ratingId: string, memberId: string): Promise<boolean> {
  const rating = await client.fetch(
    `*[_type == "bookClubRating" && _id == $id][0]{ "memberId": member._ref }`,
    { id: ratingId }
  );
  return rating?.memberId === memberId;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await assertOwnership(id, session.memberId))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { value, review } = body;
  if (typeof value !== 'number' || value < 0 || value > 7) {
    return NextResponse.json({ error: 'Invalid value' }, { status: 400 });
  }

  await writeClient.patch(id)
    .set({ value, review: typeof review === 'string' ? review.trim() : '' })
    .commit();

  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await assertOwnership(id, session.memberId))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await writeClient.delete(id);
  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ ok: true });
}
