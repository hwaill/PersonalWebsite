import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { verifySession, SESSION_COOKIE } from '@/lib/bookclub-auth';
import ManageClient from './ManageClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Manage | Book Club' };

export default async function ManagePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? verifySession(token) : null;

  return (
    <main className="pageContent">
      <ManageClient initialSession={session} />
    </main>
  );
}
