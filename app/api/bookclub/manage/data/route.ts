import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { client } from '@/sanity/lib/client';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { memberId, isAdmin } = session;

  const [member, myRatings, allBooks, allMembers] = await Promise.all([
    client.fetch(
      `*[_type == "bookClubMember" && _id == $id][0]{ _id, name, tagline, photo }`,
      { id: memberId }
    ),
    client.fetch(
      `*[_type == "bookClubRating" && member._ref == $memberId] | order(_createdAt desc) {
        _id, value, review,
        book->{ _id, title, author, genre, coverImage, inProgress, dateCompleted }
      }`,
      { memberId }
    ),
    client.fetch(
      `*[_type == "bookClubBook"] | order(dateCompleted desc, _createdAt desc) {
        _id, title, author, genre, pages, yearPublished, inProgress, dateCompleted, coverImage,
        "mvp": mvp->{ _id, name }
      }`
    ),
    isAdmin
      ? client.fetch(`*[_type == "bookClubMember"] | order(name asc){ _id, name }`)
      : Promise.resolve([]),
  ]);

  return NextResponse.json({ member, myRatings, allBooks, allMembers });
}
