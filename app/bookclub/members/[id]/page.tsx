import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { memberByIdQuery, allMemberIdsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { NavLinksRegistrar } from '@/app/components/nav/NavLinksRegistrar';
import MemberRatingsClient from '@/app/bookclub/components/MemberRatingsClient';
import type { BCMemberDetail, BCMemberRating, BCMvpBook } from '@/app/types';

export const revalidate = 60;

export async function generateStaticParams() {
  const members = await client.fetch(allMemberIdsQuery);
  return members.map((m: { _id: string }) => ({ id: m._id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const member = await client.fetch(memberByIdQuery, { memberId: id });
  if (!member) return {};
  return { title: `${member.name} | Book Club` };
}

function getUrl(image: unknown, width = 400): string | null {
  if (!image) return null;
  try { return urlFor(image as Parameters<typeof urlFor>[0]).width(width).url(); }
  catch { return null; }
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member: BCMemberDetail | null = await client.fetch(memberByIdQuery, { memberId: id });
  if (!member) notFound();

  const photoUrl = getUrl(member.photo, 200);
  const ratings = member.ratings ?? [];
  const mvpBooks = member.mvpBooks ?? [];

  const avgGiven = ratings.length > 0
    ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length
    : null;

  const mvpBookIds = mvpBooks.map(b => b._id);

  type RatingWithCover = BCMemberRating & { coverUrl: string | null };
  const ratingsWithCovers: RatingWithCover[] = ratings.map((r: BCMemberRating) => ({
    ...r,
    coverUrl: getUrl(r.book.coverImage, 200),
  }));

  const mvpBooksWithCovers = mvpBooks.map((b: BCMvpBook) => ({
    ...b,
    coverUrl: getUrl(b.coverImage, 160),
  }));

  const navLinks = [
    { href: '#ratings', label: 'Books & Ratings' },
    ...(mvpBooks.length > 0 ? [{ href: '#mvp', label: 'MVP wins' }] : []),
  ];

  return (
    <main className="pageContent memberDetailPage">
      <NavLinksRegistrar links={navLinks} />

      <div className="memberDetailHero">
        <Link href="/bookclub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/logoFlatTight.svg"
            alt="Henry Waill"
            className="memberDetailHeroLogo"
            data-nav-hero=""
          />
        </Link>
        <p className="pageLabel">Book Club · Member</p>
        <div className="memberHeroGrid">
          <div className="memberAvatarLarge">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt={member.name} />
            ) : (
              initials(member.name)
            )}
          </div>
          <div className="memberHeroInfo">
            <h1 className="memberName">{member.name}</h1>
            {member.tagline && (
              <h2 className="memberTagline">{member.tagline}</h2>
            )}
            <div className="memberStats">
              <div className="statItem">
                <div className="statVal">{ratings.length}</div>
                <div className="statLabel">Books read</div>
              </div>
              {avgGiven !== null && (
                <div className="statItem">
                  <div className="statVal">{avgGiven.toFixed(1)}</div>
                  <div className="statLabel">Avg rating</div>
                </div>
              )}
              {mvpBooks.length > 0 && (
                <div className="statItem">
                  <div className="statVal mvpVal">★ {mvpBooks.length}</div>
                  <div className="statLabel">MVP win{mvpBooks.length !== 1 ? 's' : ''}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section id="ratings" className="pageSection">
        <h2 className="pageSectionHeading">Books &amp; Ratings</h2>
        <MemberRatingsClient ratings={ratingsWithCovers} mvpBookIds={mvpBookIds} />
      </section>

      {mvpBooksWithCovers.length > 0 && (
        <section id="mvp" className="pageSection">
          <h2 className="pageSectionHeading">MVP Wins</h2>
          <div className="mvpList">
            {mvpBooksWithCovers.map(book => (
              <Link key={book._id} href={`/bookclub/books/${book._id}`} className="mvpRow">
                <div className="mvpRowCover">
                  {book.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.coverUrl} alt={book.title} />
                  )}
                </div>
                <div className="mvpRowInfo">
                  <div className="mvpRowTitle">{book.title}</div>
                  <div className="mvpRowAuthor">{book.author}</div>
                </div>
                <div className="mvpStarMark">★</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
