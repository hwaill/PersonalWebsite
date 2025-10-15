import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google';
import '@/app/css/main.css';

import style from "./bookClub.module.css"

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
	height: 'device-height',
  width: 'device-width',
  initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false
};

export const metadata: Metadata = {
	title: {
		default: 'Book Club',
		template: 'Book Club - %s'
	},
	description: 'This is the personal website and portfolio of Henry Waill, Creative Technologist.'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<div className={style.bookClubPage}>
					{children}
				</div>
			</body>
			<GoogleAnalytics gaId='G-0T2H3H83B4' />
		</html>
	);
};
