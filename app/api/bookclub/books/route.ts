import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import { writeClient } from '@/sanity/lib/writeClient';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;
  if (!session?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const formData = await req.formData();
  const title = (formData.get('title') as string | null)?.trim();
  const author = (formData.get('author') as string | null)?.trim();

  if (!title || !author) {
    return NextResponse.json({ error: 'Title and author are required' }, { status: 400 });
  }

  const genre = (formData.get('genre') as string | null) || undefined;
  const pagesRaw = formData.get('pages') as string | null;
  const yearRaw = formData.get('yearPublished') as string | null;
  const pages = pagesRaw ? parseInt(pagesRaw) : undefined;
  const yearPublished = yearRaw ? parseInt(yearRaw) : undefined;
  const inProgress = formData.get('inProgress') === 'true';
  const dateCompleted = (formData.get('dateCompleted') as string | null) || undefined;
  const coverFile = formData.get('cover') as File | null;

  let coverImage: object | undefined;
  if (coverFile && coverFile.size > 0) {
    const buffer = Buffer.from(await coverFile.arrayBuffer());
    const asset = await writeClient.assets.upload('image', buffer, {
      filename: coverFile.name,
      contentType: coverFile.type,
    });
    coverImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  }

  const doc = await writeClient.create({
    _type: 'bookClubBook',
    title,
    author,
    ...(genre ? { genre } : {}),
    ...(pages && !isNaN(pages) ? { pages } : {}),
    ...(yearPublished && !isNaN(yearPublished) ? { yearPublished } : {}),
    inProgress,
    ...(dateCompleted ? { dateCompleted } : {}),
    ...(coverImage ? { coverImage } : {}),
  });

  revalidatePath('/bookclub', 'layout');
  return NextResponse.json({ _id: doc._id });
}
