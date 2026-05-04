import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { writeClient } from '@/sanity/lib/writeClient';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { bookId, value, review } = body;

  if (typeof bookId !== 'string' || typeof value !== 'number' || value < 0 || value > 7) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const existing = await client.fetch(
    `*[_type == "bookClubRating" && member._ref == $memberId && book._ref == $bookId][0]._id`,
    { memberId: session.memberId, bookId }
  );
  if (existing) {
    return NextResponse.json({ error: 'Rating already exists for this book' }, { status: 409 });
  }

  const doc = await writeClient.create({
    _type: 'bookClubRating',
    book: { _type: 'reference', _ref: bookId },
    member: { _type: 'reference', _ref: session.memberId },
    value,
    ...(typeof review === 'string' && review.trim() ? { review: review.trim() } : {}),
  });

  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ _id: doc._id });
}
