'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { resolveCoverImage, urlFor } from '@/sanity/lib/image';
import type { BCImage, BCCoverImage } from '@/app/types';

type Session = { memberId: string; isAdmin: boolean };

type ManageProfile = { _id: string; name: string; tagline?: string; photo?: BCImage };
type ManageBook = {
  _id: string; title: string; author: string; genre?: string;
  pages?: number; yearPublished?: number; inProgress?: boolean;
  dateCompleted?: string; coverImage?: BCCoverImage;
  mvp?: { _id: string; name: string };
};
type ManageRating = {
  _id: string; value: number; review?: string;
  book: { _id: string; title: string; author: string; genre?: string; coverImage?: BCCoverImage; inProgress?: boolean };
};
type ManageMember = { _id: string; name: string };
type ManageData = {
  member: ManageProfile;
  myRatings: ManageRating[];
  allBooks: ManageBook[];
  allMembers: ManageMember[];
};

type Tab = 'profile' | 'ratings' | 'books';

function getImgUrl(image: BCCoverImage | BCImage | undefined, w = 200): string | null {
  if (!image) return null;
  const resolved = resolveCoverImage(image, w);
  if (resolved) return resolved;
  try { return urlFor(image as Parameters<typeof urlFor>[0]).width(w).url(); } catch { return null; }
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

async function apiFetch<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

// ── Rating slider ──────────────────────────────────────────────────────────────

function RatingSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="manageRatingWrap">
      <input
        type="range" min="0" max="7" step="1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="manageRatingSlider"
      />
      <span className="manageRatingVal">
        {value}<span className="ratingDenom">/7</span>
      </span>
    </div>
  );
}

// ── Login form ─────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (s: Session) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch<Session>('/api/bookclub/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      onLogin(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="manageLoginCard">
      <p className="pageLabel" style={{ marginBottom: 4 }}>Book Club · Manage</p>
      <h2 className="sectionTitle" style={{ marginBottom: 24 }}>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div className="manageField">
          <label className="manageLabel">Username</label>
          <input
            className="manageInput" type="text" autoComplete="username"
            value={username} onChange={e => setUsername(e.target.value)} required
          />
        </div>
        <div className="manageField" style={{ marginBottom: 20 }}>
          <label className="manageLabel">Password</label>
          <input
            className="manageInput" type="password" autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)} required
          />
        </div>
        {error && <div className="manageAlert error">{error}</div>}
        <button className="manageBtn" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

// ── Profile tab ────────────────────────────────────────────────────────────────

function ProfileTab({ data, session, onUpdate }: { data: ManageData; session: Session; onUpdate: () => void }) {
  const { member } = data;
  const photoUrl = getImgUrl(member.photo, 200);
  const [name, setName] = useState(member.name);
  const [tagline, setTagline] = useState(member.tagline ?? '');
  const [profileMsg, setProfileMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);
    try {
      await apiFetch(`/api/bookclub/members/${session.memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, tagline }),
      });
      setProfileMsg({ type: 'success', text: 'Profile saved.' });
      onUpdate();
    } catch (err) {
      setProfileMsg({ type: 'error', text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoLoading(true);
    setProfileMsg(null);
    try {
      const fd = new FormData();
      fd.append('photo', file);
      await apiFetch(`/api/bookclub/members/${session.memberId}`, { method: 'PATCH', body: fd });
      setProfileMsg({ type: 'success', text: 'Photo updated.' });
      onUpdate();
    } catch (err) {
      setProfileMsg({ type: 'error', text: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setPhotoLoading(false);
    }
  }

  return (
    <div className="manageSection">
      <div className="sectionRow" style={{ marginBottom: 20 }}>
        <h2 className="sectionTitle">Profile</h2>
      </div>
      <form className="manageForm" onSubmit={saveProfile}>
        <div className="manageField">
          <label className="manageLabel">Photo</label>
          <div className="managePhotoArea">
            <div className="managePhotoPreview">
              {photoUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={photoUrl} alt={member.name} />
                : initials(member.name)}
            </div>
            <div>
              <button
                type="button" className="manageBtnGhost"
                onClick={() => photoRef.current?.click()}
                disabled={photoLoading}
              >
                {photoLoading ? 'Uploading…' : 'Upload photo'}
              </button>
              <input
                ref={photoRef} type="file" accept="image/*"
                style={{ display: 'none' }} onChange={handlePhotoChange}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--inactive)', marginTop: 6 }}>
                JPG or PNG, max 10 MB
              </p>
            </div>
          </div>
        </div>

        <div className="manageField">
          <label className="manageLabel">Name</label>
          <input
            className="manageInput" type="text" value={name}
            onChange={e => setName(e.target.value)} required
          />
        </div>

        <div className="manageField" style={{ marginBottom: 20 }}>
          <label className="manageLabel">Tagline</label>
          <input
            className="manageInput" type="text" value={tagline}
            onChange={e => setTagline(e.target.value)}
            placeholder="e.g. Fiction obsessive"
          />
        </div>

        {profileMsg && <div className={`manageAlert ${profileMsg.type}`}>{profileMsg.text}</div>}
        <div className="manageFormActions">
          <button className="manageBtn" type="submit" disabled={profileLoading}>
            {profileLoading ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Ratings tab ────────────────────────────────────────────────────────────────

function RatingsTab({ data, session, onUpdate }: { data: ManageData; session: Session; onUpdate: () => void }) {
  const { myRatings, allBooks } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingRating, setAddingRating] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const ratedBookIds = new Set(myRatings.map(r => r.book._id));
  const unratedBooks = allBooks.filter(b => !ratedBookIds.has(b._id) && !b.inProgress);

  return (
    <div className="manageSection">
      <div className="sectionRow" style={{ marginBottom: 20 }}>
        <h2 className="sectionTitle">My Ratings</h2>
        <span className="sectionCount">{myRatings.length} {myRatings.length === 1 ? 'rating' : 'ratings'}</span>
      </div>

      {msg && <div className={`manageAlert ${msg.type}`}>{msg.text}</div>}

      {unratedBooks.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {addingRating ? (
            <AddRatingForm
              books={unratedBooks}
              onSave={() => { setAddingRating(false); setMsg({ type: 'success', text: 'Rating added.' }); onUpdate(); }}
              onCancel={() => setAddingRating(false)}
              onError={e => setMsg({ type: 'error', text: e })}
            />
          ) : (
            <button className="manageBtnGhost" onClick={() => { setMsg(null); setAddingRating(true); }}>
              + Add rating
            </button>
          )}
        </div>
      )}

      {myRatings.length === 0 ? (
        <p className="bcEmptyState">No ratings yet.</p>
      ) : (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {myRatings.map(rating => (
            <RatingRow
              key={rating._id}
              rating={rating}
              isEditing={editingId === rating._id}
              onEdit={() => { setMsg(null); setEditingId(rating._id); }}
              onCancelEdit={() => setEditingId(null)}
              onSaved={() => { setEditingId(null); setMsg({ type: 'success', text: 'Rating updated.' }); onUpdate(); }}
              onDeleted={() => { setMsg({ type: 'success', text: 'Rating deleted.' }); onUpdate(); }}
              onError={e => setMsg({ type: 'error', text: e })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RatingRow({
  rating, isEditing, onEdit, onCancelEdit, onSaved, onDeleted, onError,
}: {
  rating: ManageRating;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaved: () => void;
  onDeleted: () => void;
  onError: (e: string) => void;
}) {
  const coverUrl = getImgUrl(rating.book.coverImage, 80);
  const [value, setValue] = useState(rating.value);
  const [review, setReview] = useState(rating.review ?? '');
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/api/bookclub/ratings/${rating._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, review }),
      });
      onSaved();
    } catch (err) { onError(err instanceof Error ? err.message : 'Save failed'); }
    finally { setLoading(false); }
  }

  async function del() {
    setLoading(true);
    try {
      await apiFetch(`/api/bookclub/ratings/${rating._id}`, { method: 'DELETE' });
      onDeleted();
    } catch (err) { onError(err instanceof Error ? err.message : 'Delete failed'); }
    finally { setLoading(false); }
  }

  return (
    <div className="manageRatingRow">
      <div className="manageRatingTop">
        <div className="manageRatingCover">
          {coverUrl
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={coverUrl} alt={rating.book.title} />
            : null}
        </div>
        <div className="manageRatingInfo">
          <div className="manageRatingTitle">{rating.book.title}</div>
          <div className="manageRatingScore">
            {rating.value}<span className="ratingDenom">/7</span>
            {rating.review && <span style={{ color: 'var(--inactive)', marginLeft: 8, fontSize: '0.78rem' }}>· has review</span>}
          </div>
        </div>
        <div className="manageRatingActions">
          {!isEditing && (
            <>
              <button className="manageBtnSmall" onClick={onEdit}>Edit</button>
              {confirmDelete ? (
                <>
                  <button className="manageBtnDanger" onClick={del} disabled={loading}>Confirm</button>
                  <button className="manageBtnSmall" onClick={() => setConfirmDelete(false)}>Cancel</button>
                </>
              ) : (
                <button className="manageBtnDanger" onClick={() => setConfirmDelete(true)}>Delete</button>
              )}
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <form className="manageRatingEdit" onSubmit={save}>
          <div className="manageField">
            <label className="manageLabel">Rating</label>
            <RatingSlider value={value} onChange={setValue} />
          </div>
          <div className="manageField" style={{ marginBottom: 12 }}>
            <label className="manageLabel">Review (optional)</label>
            <textarea
              className="manageTextarea" value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="Your thoughts on this book…"
            />
          </div>
          <div className="manageFormActions">
            <button className="manageBtn" type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </button>
            <button className="manageBtnGhost" type="button" onClick={onCancelEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

function AddRatingForm({
  books, onSave, onCancel, onError,
}: {
  books: ManageBook[];
  onSave: () => void;
  onCancel: () => void;
  onError: (e: string) => void;
}) {
  const [bookId, setBookId] = useState(books[0]?._id ?? '');
  const [value, setValue] = useState(4);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch('/api/bookclub/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, value, review }),
      });
      onSave();
    } catch (err) { onError(err instanceof Error ? err.message : 'Save failed'); }
    finally { setLoading(false); }
  }

  return (
    <form className="manageAddRating" onSubmit={save}>
      <div className="manageField">
        <label className="manageLabel">Book</label>
        <select className="manageSelect" value={bookId} onChange={e => setBookId(e.target.value)}>
          {books.map(b => <option key={b._id} value={b._id}>{b.title}</option>)}
        </select>
      </div>
      <div className="manageField">
        <label className="manageLabel">Rating</label>
        <RatingSlider value={value} onChange={setValue} />
      </div>
      <div className="manageField" style={{ marginBottom: 12 }}>
        <label className="manageLabel">Review (optional)</label>
        <textarea
          className="manageTextarea" value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Your thoughts on this book…"
        />
      </div>
      <div className="manageFormActions">
        <button className="manageBtn" type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add rating'}
        </button>
        <button className="manageBtnGhost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

// ── Books tab (admin) ──────────────────────────────────────────────────────────

function BooksTab({ data, onUpdate }: { data: ManageData; onUpdate: () => void }) {
  const { allBooks, allMembers } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingBook, setAddingBook] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  return (
    <div className="manageSection">
      <div className="sectionRow" style={{ marginBottom: 20 }}>
        <h2 className="sectionTitle">Books</h2>
        <span className="sectionCount">{allBooks.length} {allBooks.length === 1 ? 'book' : 'books'}</span>
      </div>

      {msg && <div className={`manageAlert ${msg.type}`}>{msg.text}</div>}

      {addingBook ? (
        <AddBookForm
          onSave={() => { setAddingBook(false); setMsg({ type: 'success', text: 'Book added.' }); onUpdate(); }}
          onCancel={() => setAddingBook(false)}
          onError={e => setMsg({ type: 'error', text: e })}
        />
      ) : (
        <div style={{ marginBottom: 20 }}>
          <button className="manageBtnGhost" onClick={() => { setMsg(null); setAddingBook(true); }}>
            + Add book
          </button>
        </div>
      )}

      <div className="manageBookList">
        {allBooks.map(book => (
          <BookRow
            key={book._id}
            book={book}
            allMembers={allMembers}
            isEditing={editingId === book._id}
            onEdit={() => { setMsg(null); setEditingId(book._id); }}
            onCancelEdit={() => setEditingId(null)}
            onSaved={() => { setEditingId(null); setMsg({ type: 'success', text: 'Book updated.' }); onUpdate(); }}
            onDeleted={() => { setMsg({ type: 'success', text: 'Book deleted.' }); onUpdate(); }}
            onError={e => setMsg({ type: 'error', text: e })}
          />
        ))}
      </div>
    </div>
  );
}

function BookRow({
  book, allMembers, isEditing, onEdit, onCancelEdit, onSaved, onDeleted, onError,
}: {
  book: ManageBook;
  allMembers: ManageMember[];
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaved: () => void;
  onDeleted: () => void;
  onError: (e: string) => void;
}) {
  const coverDisplayUrl = getImgUrl(book.coverImage, 80);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre ?? '');
  const [pages, setPages] = useState(book.pages?.toString() ?? '');
  const [yearPublished, setYearPublished] = useState(book.yearPublished?.toString() ?? '');
  const [inProgress, setInProgress] = useState(book.inProgress ?? false);
  const [dateCompleted, setDateCompleted] = useState(book.dateCompleted ?? '');
  const [mvpId, setMvpId] = useState<string | null>(book.mvp?._id ?? null);
  const existingExternalUrl = (book.coverImage as { externalUrl?: string } | undefined)?.externalUrl ?? '';
  const [coverType, setCoverType] = useState<'upload' | 'url'>(existingExternalUrl ? 'url' : 'upload');
  const [coverUrl, setCoverUrl] = useState(existingExternalUrl);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [coverMsg, setCoverMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch(`/api/bookclub/books/${book._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, author,
          genre: genre || null,
          pages: pages ? parseInt(pages) : undefined,
          yearPublished: yearPublished ? parseInt(yearPublished) : undefined,
          inProgress,
          dateCompleted: dateCompleted || null,
          mvpId,
          ...(coverType === 'url' ? { coverExternalUrl: coverUrl.trim() } : {}),
        }),
      });
      onSaved();
    } catch (err) { onError(err instanceof Error ? err.message : 'Save failed'); }
    finally { setLoading(false); }
  }

  async function uploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('cover', file);
      await apiFetch(`/api/bookclub/books/${book._id}`, { method: 'PUT', body: fd });
      setCoverMsg({ type: 'success', text: 'Cover updated.' });
      onSaved();
    } catch (err) { onError(err instanceof Error ? err.message : 'Upload failed'); }
    finally { setLoading(false); }
  }

  async function del() {
    setLoading(true);
    try {
      await apiFetch(`/api/bookclub/books/${book._id}`, { method: 'DELETE' });
      onDeleted();
    } catch (err) { onError(err instanceof Error ? err.message : 'Delete failed'); }
    finally { setLoading(false); }
  }

  return (
    <div className="manageBookItem">
      <div className="manageBookTop">
        <div className="manageBookCover">
          {coverDisplayUrl
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={coverDisplayUrl} alt={book.title} />
            : null}
        </div>
        <div className="manageBookInfo">
          <div className="manageBookTitle">{book.title}</div>
          <div className="manageBookAuthor">{book.author}</div>
          {book.inProgress && (
            <div className="manageBookBadge">
              <span className="bookInProgress" style={{ marginTop: 0, paddingTop: 0 }}>Currently reading</span>
            </div>
          )}
          {book.mvp && <div className="manageBookMvp">★ MVP: {book.mvp.name}</div>}
        </div>
        <div className="manageBookActions">
          {!isEditing ? (
            <>
              <button className="manageBtnSmall" onClick={onEdit}>Edit</button>
              {confirmDelete ? (
                <>
                  <button className="manageBtnDanger" onClick={del} disabled={loading}>Confirm</button>
                  <button className="manageBtnSmall" onClick={() => setConfirmDelete(false)}>Cancel</button>
                </>
              ) : (
                <button className="manageBtnDanger" onClick={() => setConfirmDelete(true)}>Delete</button>
              )}
            </>
          ) : null}
        </div>
      </div>

      {coverMsg && <div className={`manageAlert ${coverMsg.type}`}>{coverMsg.text}</div>}

      {isEditing && (
        <form className="manageBookEdit" onSubmit={save}>
          <div className="manageFormGrid">
            <div className="manageField">
              <label className="manageLabel">Title</label>
              <input className="manageInput" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="manageField">
              <label className="manageLabel">Author</label>
              <input className="manageInput" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>
            <div className="manageField">
              <label className="manageLabel">Genre</label>
              <select className="manageSelect" value={genre} onChange={e => setGenre(e.target.value)}>
                <option value="">—</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
              </select>
            </div>
            <div className="manageField">
              <label className="manageLabel">Pages</label>
              <input className="manageInput" type="number" min="1" value={pages} onChange={e => setPages(e.target.value)} />
            </div>
            <div className="manageField">
              <label className="manageLabel">Year published</label>
              <input className="manageInput" type="number" min="1" value={yearPublished} onChange={e => setYearPublished(e.target.value)} />
            </div>
            <div className="manageField">
              <label className="manageLabel">Date completed</label>
              <input className="manageInput" type="date" value={dateCompleted} onChange={e => setDateCompleted(e.target.value)} />
            </div>
          </div>

          <div className="manageField" style={{ marginTop: 4 }}>
            <label className="manageLabel" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={inProgress} onChange={e => setInProgress(e.target.checked)} />
              <span>Currently reading (in progress)</span>
            </label>
          </div>

          <div className="manageField">
            <label className="manageLabel">MVP</label>
            <select className="manageSelect" value={mvpId ?? ''} onChange={e => setMvpId(e.target.value || null)}>
              <option value="">— None —</option>
              {allMembers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
            </select>
          </div>

          <div className="manageField" style={{ marginBottom: 0 }}>
            <label className="manageLabel">Cover image</label>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <button
                type="button"
                className="manageBtnSmall"
                style={coverType === 'upload' ? { background: 'var(--coffee)', color: 'var(--white)', borderColor: 'var(--coffee)' } : {}}
                onClick={() => setCoverType('upload')}
              >Upload</button>
              <button
                type="button"
                className="manageBtnSmall"
                style={coverType === 'url' ? { background: 'var(--coffee)', color: 'var(--white)', borderColor: 'var(--coffee)' } : {}}
                onClick={() => setCoverType('url')}
              >Link</button>
            </div>
            {coverType === 'upload' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {coverDisplayUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverDisplayUrl} alt={book.title} style={{ width: 36, height: 54, objectFit: 'cover', borderRadius: 3 }} />
                )}
                <button type="button" className="manageBtnGhost" onClick={() => coverRef.current?.click()} disabled={loading}>
                  {loading ? 'Uploading…' : 'Upload cover'}
                </button>
                <input ref={coverRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadCover} />
              </div>
            ) : (
              <input
                className="manageInput"
                type="url"
                placeholder="https://example.com/cover.jpg or /img/cover.jpg"
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
              />
            )}
          </div>

          <div className="manageFormActions">
            <button className="manageBtn" type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </button>
            <button className="manageBtnGhost" type="button" onClick={onCancelEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

function AddBookForm({ onSave, onCancel, onError }: {
  onSave: () => void; onCancel: () => void; onError: (e: string) => void;
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [dateCompleted, setDateCompleted] = useState('');
  const [coverType, setCoverType] = useState<'upload' | 'url'>('upload');
  const [coverUrl, setCoverUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('author', author);
      if (genre) fd.append('genre', genre);
      if (pages) fd.append('pages', pages);
      if (yearPublished) fd.append('yearPublished', yearPublished);
      fd.append('inProgress', String(inProgress));
      if (dateCompleted) fd.append('dateCompleted', dateCompleted);
      if (coverType === 'upload') {
        const coverFile = coverRef.current?.files?.[0];
        if (coverFile) fd.append('cover', coverFile);
      } else if (coverUrl.trim()) {
        fd.append('coverUrl', coverUrl.trim());
      }
      await apiFetch('/api/bookclub/books', { method: 'POST', body: fd });
      onSave();
    } catch (err) { onError(err instanceof Error ? err.message : 'Failed to add book'); }
    finally { setLoading(false); }
  }

  return (
    <form className="manageAddBook" onSubmit={save}>
      <p className="manageLabel" style={{ marginBottom: 16 }}>New book</p>
      <div className="manageFormGrid">
        <div className="manageField">
          <label className="manageLabel">Title</label>
          <input className="manageInput" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="manageField">
          <label className="manageLabel">Author</label>
          <input className="manageInput" value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <div className="manageField">
          <label className="manageLabel">Genre</label>
          <select className="manageSelect" value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">—</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Nonfiction</option>
          </select>
        </div>
        <div className="manageField">
          <label className="manageLabel">Pages</label>
          <input className="manageInput" type="number" min="1" value={pages} onChange={e => setPages(e.target.value)} />
        </div>
        <div className="manageField">
          <label className="manageLabel">Year published</label>
          <input className="manageInput" type="number" min="1" value={yearPublished} onChange={e => setYearPublished(e.target.value)} />
        </div>
        <div className="manageField">
          <label className="manageLabel">Date completed</label>
          <input className="manageInput" type="date" value={dateCompleted} onChange={e => setDateCompleted(e.target.value)} />
        </div>
      </div>
      <div className="manageField" style={{ marginTop: 4 }}>
        <label className="manageLabel" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={inProgress} onChange={e => setInProgress(e.target.checked)} />
          <span>Currently reading (in progress)</span>
        </label>
      </div>
      <div className="manageField" style={{ marginBottom: 0 }}>
        <label className="manageLabel">Cover image</label>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <button
            type="button"
            className={coverType === 'upload' ? 'manageBtnSmall active' : 'manageBtnSmall'}
            style={coverType === 'upload' ? { background: 'var(--coffee)', color: 'var(--white)', borderColor: 'var(--coffee)' } : {}}
            onClick={() => setCoverType('upload')}
          >Upload</button>
          <button
            type="button"
            className={coverType === 'url' ? 'manageBtnSmall active' : 'manageBtnSmall'}
            style={coverType === 'url' ? { background: 'var(--coffee)', color: 'var(--white)', borderColor: 'var(--coffee)' } : {}}
            onClick={() => setCoverType('url')}
          >Link</button>
        </div>
        {coverType === 'upload' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button type="button" className="manageBtnGhost" onClick={() => coverRef.current?.click()}>
              Choose file
            </button>
            {selectedFileName && (
              <span style={{ fontSize: '0.78rem', color: 'var(--inactive)' }}>{selectedFileName}</span>
            )}
            <input
              ref={coverRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => setSelectedFileName(e.target.files?.[0]?.name ?? '')}
            />
          </div>
        ) : (
          <input
            className="manageInput"
            type="url"
            placeholder="https://example.com/cover.jpg or /img/cover.jpg"
            value={coverUrl}
            onChange={e => setCoverUrl(e.target.value)}
          />
        )}
      </div>
      <div className="manageFormActions">
        <button className="manageBtn" type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add book'}
        </button>
        <button className="manageBtnGhost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ManageClient({ initialSession }: { initialSession: Session | null }) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [tab, setTab] = useState<Tab>('profile');
  const [data, setData] = useState<ManageData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');

  const loadData = useCallback(async () => {
    setDataLoading(true);
    setDataError('');
    try {
      const d = await apiFetch<ManageData>('/api/bookclub/manage/data');
      setData(d);
    } catch {
      setDataError('Failed to load data. Please refresh.');
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) loadData();
  }, [session, loadData]);

  async function handleLogout() {
    await fetch('/api/bookclub/logout', { method: 'POST' });
    setSession(null);
    setData(null);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'ratings', label: 'My Ratings' },
    ...(session?.isAdmin ? [{ key: 'books' as Tab, label: 'Books' }] : []),
  ];

  return (
    <div className="managePage">
      <div className="manageHero">
        <Link href="/bookclub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/logoFlatTight.svg"
            alt="Henry Waill"
            className="manageHeroLogo"
            data-nav-hero=""
          />
        </Link>
        <p className="pageLabel">Book Club · Manage</p>
        {session && data && (
          <div className="manageHeroRow">
            <h1 className="manageHeroTitle">Manage.</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="manageUserLabel">{data.member.name}</span>
              <button className="manageBtnLogout" onClick={handleLogout}>Sign out</button>
            </div>
          </div>
        )}
        {!session && (
          <h1 className="manageHeroTitle">Manage.</h1>
        )}
      </div>

      {!session ? (
        <LoginForm onLogin={setSession} />
      ) : dataLoading ? (
        <p className="bcEmptyState">Loading…</p>
      ) : dataError ? (
        <p className="bcEmptyState" style={{ color: 'var(--red)' }}>{dataError}</p>
      ) : data ? (
        <>
          <div className="sortBar" style={{ padding: '24px 0 0' }}>
            {tabs.map(t => (
              <button
                key={t.key}
                className={`sortBtn${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'profile' && (
            <ProfileTab data={data} session={session} onUpdate={loadData} />
          )}
          {tab === 'ratings' && (
            <RatingsTab data={data} session={session} onUpdate={loadData} />
          )}
          {tab === 'books' && session.isAdmin && (
            <BooksTab data={data} onUpdate={loadData} />
          )}
        </>
      ) : null}
    </div>
  );
}
