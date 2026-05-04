'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BCBook } from '@/app/types';

type Props = { books: BCBook[] };

const SORT_OPTIONS = [
  { value: 'Newest read', short: 'Newest' },
  { value: 'Oldest read', short: 'Oldest' },
  { value: 'Highest rated', short: 'Highest' },
  { value: 'Lowest rated', short: 'Lowest' },
] as const;
type SortOption = typeof SORT_OPTIONS[number]['value'];

const PAGE_SIZE = 6;

function sortBooks(books: BCBook[], by: SortOption): BCBook[] {
  const copy = [...books];
  switch (by) {
    case 'Newest read':
      return copy.sort((a, b) => {
        if (a.inProgress && !b.inProgress) return -1;
        if (!a.inProgress && b.inProgress) return 1;
        if (!a.dateCompleted && !b.dateCompleted) return 0;
        if (!a.dateCompleted) return 1;
        if (!b.dateCompleted) return -1;
        return b.dateCompleted.localeCompare(a.dateCompleted);
      });
    case 'Oldest read':
      return copy.sort((a, b) => {
        if (!a.dateCompleted && !b.dateCompleted) return 0;
        if (!a.dateCompleted) return 1;
        if (!b.dateCompleted) return -1;
        return a.dateCompleted.localeCompare(b.dateCompleted);
      });
    case 'Highest rated':
      return copy.sort((a, b) => {
        if (a.inProgress) return 1;
        if (b.inProgress) return -1;
        if (a.avgRating === null && b.avgRating === null) return 0;
        if (a.avgRating === null) return 1;
        if (b.avgRating === null) return -1;
        return b.avgRating - a.avgRating;
      });
    case 'Lowest rated':
      return copy.sort((a, b) => {
        if (a.inProgress) return 1;
        if (b.inProgress) return -1;
        if (a.avgRating === null && b.avgRating === null) return 0;
        if (a.avgRating === null) return 1;
        if (b.avgRating === null) return -1;
        return a.avgRating - b.avgRating;
      });
  }
}

export default function BookListClient({ books }: Props) {
  const [sort, setSort] = useState<SortOption>('Newest read');
  const [page, setPage] = useState(0);

  function handleSort(opt: SortOption) {
    setSort(opt);
    setPage(0);
  }

  const sorted = sortBooks(books, sort);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const currentPage = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <div className="sectionRow">
        <h2 className="sectionTitle">Books</h2>
        <span className="sectionCount">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
      </div>

      <div className="sortBar">
        <span className="sortLabelText">Sort</span>
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`sortBtn${sort === opt.value ? ' active' : ''}`}
            onClick={() => handleSort(opt.value)}
          >
            <span className="sortBtnFull">{opt.value}</span>
            <span className="sortBtnShort">{opt.short}</span>
          </button>
        ))}
      </div>

      {currentPage.length === 0 ? (
        <p className="bcEmptyState">No books yet.</p>
      ) : (
        <div className="booksGrid">
          {currentPage.map(book => (
            <Link key={book._id} href={`/bookclub/books/${book._id}`} className="bookCard">
              <div className="bookCover">
                {book.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.coverUrl} alt={book.title} />
                ) : (
                  <div className="bookCoverPlaceholder">{book.title}</div>
                )}
              </div>
              <div className="bookInfo">
                <span className="bookGenre">{book.genre === 'fiction' ? 'Fiction' : book.genre === 'nonfiction' ? 'Nonfiction' : ''}</span>
                <div className="bookTitle">{book.title}</div>
                <div className="bookAuthor">{book.author}</div>
                {book.inProgress ? (
                  <div className="bookInProgress">Currently reading</div>
                ) : book.avgRating !== null ? (
                  <div className="bookRating">
                    <div className="ratingBar">
                      <div className="ratingFill" style={{ width: `${(book.avgRating / 7) * 100}%` }} />
                    </div>
                    <span className="ratingNum">
                      {book.avgRating.toFixed(2)}<span className="ratingDenom"> /7</span>
                    </span>
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pageBtn"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pageBtn${page === i ? ' active' : ''}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
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
