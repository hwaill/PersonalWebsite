import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const type: string | undefined = body?._type

  // Projects affect the homepage and the full /projects tree
  if (type === 'project') {
    revalidatePath('/', 'page')
    revalidatePath('/projects', 'layout')
  } else {
    // Catch-all: purge everything for any other document type
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true, type: type ?? 'unknown' })
}
