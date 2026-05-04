import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { bookByIdQuery, allBookIdsQuery } from '@/sanity/lib/queries';
import { resolveCoverImage } from '@/sanity/lib/image';
import { NavLinksRegistrar } from '@/app/components/nav/NavLinksRegistrar';
import type { BCBookDetail, BCRating } from '@/app/types';

export const revalidate = 60;

export async function generateStaticParams() {
  const books = await client.fetch(allBookIdsQuery);
  return books.map((b: { _id: string }) => ({ id: b._id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = await client.fetch(bookByIdQuery, { id });
  if (!book) return {};
  return { title: `${book.title} | Book Club` };
}


function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatRating(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book: BCBookDetail | null = await client.fetch(bookByIdQuery, { id });
  if (!book) notFound();

  const coverUrl = resolveCoverImage(book.coverImage, 400);
  const ratings = book.ratings ?? [];

  const avgRating = ratings.length > 0
    ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length
    : null;

  const hasReview = ratings.some(r => r.review);
  const readDate = book.dateCompleted ? formatDate(book.dateCompleted) : null;
  const genreLabel = book.genre === 'fiction' ? 'Fiction' : book.genre === 'nonfiction' ? 'Nonfiction' : null;

  const navLinks = [
    ...(book.mvp ? [{ href: '#mvp', label: 'MVP' }] : []),
    ...(ratings.length > 0 ? [{ href: '#ratings', label: 'Ratings' }] : []),
    ...(hasReview ? [{ href: '#review', label: 'Review' }] : []),
  ];

  return (
    <main className="pageContent bookDetailPage">
      <NavLinksRegistrar links={navLinks} />

      <div className="bookDetailHero">
        <Link href="/bookclub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/logoFlatTight.svg"
            alt="Henry Waill"
            className="bookDetailHeroLogo"
            data-nav-hero=""
          />
        </Link>
        <p className="pageLabel">Book Club · Book</p>
        <div className="bookDetailHeroGrid">
          <div className="bookDetailCover">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt={book.title} />
            ) : (
              <div className="bookCoverPlaceholder">{book.title}</div>
            )}
          </div>
          <div className="bookDetailHeroInfo">
            <p className="bookDetailGenreLabel">{genreLabel ?? ''}</p>
            <h1 className="bookDetailTitle">{book.title}</h1>
            <h2 className="bookDetailAuthor">{book.author}</h2>
            <div className="bookDetailMeta">
              {book.pages && (
                <div className="metaItem">
                  <div className="metaLabel">Pages</div>
                  <div className="metaValue">{book.pages.toLocaleString()}</div>
                </div>
              )}
              {readDate && (
                <div className="metaItem">
                  <div className="metaLabel">Read</div>
                  <div className="metaValue">{readDate}</div>
                </div>
              )}
            </div>
            {book.inProgress ? (
              <div className="inProgressBadge">Currently reading; Ratings coming soon</div>
            ) : avgRating !== null ? (
              <div className="ratingDisplay">
                <div className="ratingBig">{avgRating.toFixed(2)}<span className="ratingBigDenom">/7</span></div>
                {/* <div className="ratingBigDenom">/7</div> */}
                <div className="ratingBarWrap">
                  <div className="ratingBarLarge">
                    <div className="ratingFillLarge" style={{ width: `${(avgRating / 7) * 100}%` }} />
                  </div>
                  <div className="ratingSubLabel">Club average · {ratings.length} ratings</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {book.mvp && (
        <section id="mvp" className="pageSection">
          <h2 className="pageSectionHeading">MVP</h2>
          <Link href={`/bookclub/members/${book.mvp._id}`} className="mvpBox">
            <div className="mvpStar">★</div>
            <div className="mvpInfo">
              <div className="mvpLabel">Book MVP</div>
              <div className="mvpName">{book.mvp.name}</div>
            </div>
          </Link>
        </section>
      )}

      {ratings.length > 0 && (
        <section id="ratings" className="pageSection">
          <h2 className="pageSectionHeading">Ratings</h2>
          <div className="scoreList">
            {ratings.map((rating: BCRating) => {
              const pct = (rating.value / 7) * 100;
              const isMvp = book.mvp?._id === rating.member._id;
              return (
                <div key={rating._id} className="scoreWrapper">
                  <Link href={`/bookclub/members/${rating.member._id}`} className="scoreRow">
                    <div className="scoreMemberName">
                      {rating.member.name}
                      {isMvp && <span className="mvpMarker">★</span>}
                    </div>
                    <div className="scoreBar">
                      <div className="scoreBarFill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="scoreVal">
                      {formatRating(rating.value)}<span className="scoreDenom">/7</span>
                    </div>
                  </Link>
                  {rating.review && (
                    <div className="scoreReview">{rating.review}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {hasReview && (
        <section id="review" className="pageSection">
          {ratings.filter(r => r.review).map(rating => (
            <div key={rating._id}>
              <h2 className="pageSectionHeading">{rating.member.name}&apos;s review</h2>
              <div className="reviewBlock">
                <div className="reviewByline">
                  <div className="reviewAvatar">{initials(rating.member.name)}</div>
                  <div>
                    <div className="reviewName">{rating.member.name}</div>
                    <div className="reviewScore">{formatRating(rating.value)} / 7</div>
                  </div>
                </div>
                <div className="reviewText">{rating.review}</div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
