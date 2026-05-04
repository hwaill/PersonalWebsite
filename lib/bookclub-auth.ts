import { createHmac, scryptSync, randomBytes, timingSafeEqual } from 'crypto';

export type SessionPayload = { memberId: string; isAdmin: boolean };

type BookclubUser = { username: string; hash: string; memberId: string; isAdmin: boolean };

export const SESSION_COOKIE = 'bc_session';
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getUsers(): BookclubUser[] {
  const raw = process.env.BOOKCLUB_USERS;
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function findUserByUsername(username: string): BookclubUser | null {
  return getUsers().find(u => u.username === username) ?? null;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

// Always runs scrypt to prevent timing-based username enumeration
export function verifyPassword(password: string, stored: string): boolean {
  const colonIdx = stored.indexOf(':');
  if (colonIdx === -1) return false;
  const salt = stored.slice(0, colonIdx);
  const storedHash = stored.slice(colonIdx + 1);
  try {
    const derived = scryptSync(password, salt, 64);
    const storedBuf = Buffer.from(storedHash, 'hex');
    if (derived.length !== storedBuf.length) return false;
    return timingSafeEqual(new Uint8Array(storedBuf), new Uint8Array(derived));
  } catch { return false; }
}

const getSecret = () => {
  const s = process.env.SECRET_KEY;
  if (!s) throw new Error('SECRET_KEY env var is not set');
  return s;
};

export function signSession(payload: SessionPayload): string {
  const header = Buffer.from('{"alg":"HS256"}').toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', getSecret()).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

export function verifySession(token: string): SessionPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const expected = createHmac('sha256', getSecret()).update(`${header}.${body}`).digest('base64url');
  if (sig !== expected) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload;
  } catch { return null; }
}
