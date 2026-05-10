import Link from 'next/link';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { booksWithRatingsQuery, membersQuery } from '@/sanity/lib/queries';
import { urlFor, resolveCoverImage } from '@/sanity/lib/image';
import { NavLinksRegistrar } from '@/app/components/nav/NavLinksRegistrar';
import BookListClient from '@/app/bookclub/components/BookListClient';
import type { BCBook, BCMember } from '@/app/types';

export const metadata: Metadata = { title: 'Book Club' };
export const revalidate = 60;

function computeAvg(values: number[]): number | null {
  if (!values?.length) return null;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function getUrl(image: unknown, width: number): string | null {
  if (!image) return null;
  try { return urlFor(image as Parameters<typeof urlFor>[0]).width(width).url(); }
  catch { return null; }
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function BookClubPage() {
  const [rawBooks, members]: [
    Array<{
      _id: string; title: string; author: string; genre?: string;
      pages?: number; yearPublished?: number; inProgress?: boolean;
      dateCompleted?: string; coverImage?: unknown; ratingValues?: number[];
    }>,
    BCMember[]
  ] = await Promise.all([
    client.fetch(booksWithRatingsQuery),
    client.fetch(membersQuery),
  ]);

  const books = rawBooks.map(b => ({
    ...b,
    genre: b.genre as 'fiction' | 'nonfiction' | undefined,
    coverImage: b.coverImage as BCBook['coverImage'],
    ratingValues: b.ratingValues ?? [],
    avgRating: computeAvg(b.ratingValues ?? []),
    coverUrl: resolveCoverImage(b.coverImage, 400),
  })) satisfies BCBook[];

  return (
    <main className="pageContent">
      <NavLinksRegistrar links={[
        { href: '#books', label: 'Books' },
        { href: '#members', label: 'Members' },
      ]} />
      <div className="bookclubPage">
        <div className="bookclubHero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/">
            <img
              src="/img/logos/logoFlatTight.svg"
              alt="Henry Waill"
              className="bookclubHeroLogo"
              data-nav-hero=""
            />
          </Link>
          <p className="pageLabel">Henry Waill · Book Club</p>
          <h1 className="bookclubHeroTitle">The Archive.</h1>
          <h2 className="bookclubHeroHook">Reading together since 2025.</h2>
        </div>

        <section id="books" className="bookclubSection">
          <BookListClient books={books} />
        </section>

        <section id="members" className="bookclubSection">
          <div className="sectionRow">
            <h2 className="sectionTitle">Members</h2>
            <span className="sectionCount">{members.length} readers</span>
          </div>
          {members.length === 0 ? (
            <p className="bcEmptyState">No members yet.</p>
          ) : (
            <div className="membersGrid">
              {members.map(member => {
                const photoUrl = getUrl(member.photo, 200);
                return (
                  <Link key={member._id} href={`/bookclub/members/${member._id}`} className="memberCard" aria-label={member.name}>
                    <div className="memberCardPhoto">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoUrl} alt={member.name} loading="lazy" />
                      ) : (
                        <div className="memberCardInitials">{initials(member.name)}</div>
                      )}
                    </div>
                    <span className="memberCardName">{member.name}</span>
                    <span className="memberCardMeta">{member.ratingCount} books read</span>
                    {(member.mvpWins ?? 0) > 0 && (
                      <span className="memberMvpBadge">★ {member.mvpWins} MVP win{member.mvpWins !== 1 ? 's' : ''}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
