'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BCMemberRating } from '@/app/types';

type RatingWithCover = BCMemberRating & { coverUrl: string | null };

type Props = {
  ratings: RatingWithCover[];
  mvpBookIds: string[];
};

const PAGE_SIZE = 10;

export default function MemberRatingsClient({ ratings, mvpBookIds }: Props) {
  const uniqueRatings = Array.from(new Set(ratings.map(r => r.value))).sort((a, b) => a - b);
  const [filter, setFilter] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const filtered = filter === null ? ratings : ratings.filter(r => r.value === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleFilter(val: number | null) {
    setFilter(val);
    setPage(0);
  }

  if (ratings.length === 0) {
    return <p className="bcEmptyState">No ratings yet.</p>;
  }

  return (
    <>
      <div className="sortBar">
        <span className="sortLabelText">Ratings</span>
        <div className="sortBtnGroup">
          <button
            className={`sortBtn${filter === null ? ' active' : ''}`}
            onClick={() => handleFilter(null)}
          >
            All
          </button>
          {uniqueRatings.map(val => (
            <button
              key={val}
              className={`sortBtn${filter === val ? ' active' : ''}`}
              onClick={() => handleFilter(val)}
            >
              {val % 1 === 0 ? `${val}.0` : val}
            </button>
          ))}
        </div>
      </div>

      <div className="booksList">
        {currentPage.map(rating => {
          const isMvp = mvpBookIds.includes(rating.book._id);
          const pct = (rating.value / 7) * 100;
          return (
            <div key={rating._id}>
              <Link
                href={`/bookclub/books/${rating.book._id}`}
                className="bookRow"
              >
                <div className="bookRowCover">
                  {rating.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={rating.coverUrl} alt={rating.book.title} />
                  )}
                </div>
                <div className="bookRowInfo">
                  <div className="bookRowTitle">{rating.book.title}</div>
                  <div className="bookRowAuthor">{rating.book.author}</div>
                  <div className="bookRowGenre">
                    {rating.book.genre
                      ? rating.book.genre.charAt(0).toUpperCase() + rating.book.genre.slice(1)
                      : ''}
                    {isMvp && <span className="bookRowMvp">★ MVP</span>}
                  </div>
                </div>
                <div className="bookRowScore">
                  <div className="scoreNum">
                    {rating.value.toFixed(1)}<span className="scoreDenom">/7</span>
                  </div>
                  <div className="scoreMiniBar">
                    <div className="scoreMiniBarFill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                {rating.review && (
                  <div className="bookRowReview">{rating.review}</div>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pageBtn"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
          >
            ←
          </button>
          <span className="paginationInfo">{page + 1} / {totalPages}</span>
          <button
            className="pageBtn"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages - 1}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
