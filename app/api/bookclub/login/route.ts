import { NextRequest, NextResponse } from 'next/server';
import {
  findUserByUsername,
  verifyPassword,
  signSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/bookclub-auth';

const DUMMY_HASH = '0'.repeat(32) + ':' + '0'.repeat(128);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { username, password } = body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const user = findUserByUsername(username);
  // Always run verifyPassword to prevent timing-based username enumeration
  const passwordValid = verifyPassword(password, user?.hash ?? DUMMY_HASH);

  if (!user || !passwordValid) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = signSession({ memberId: user.memberId, isAdmin: user.isAdmin });
  const res = NextResponse.json({ memberId: user.memberId, isAdmin: user.isAdmin });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
