import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Figtree } from 'next/font/google';
import '@/app/css/main.css';

export const figtree = Figtree({
	subsets: ['latin'],
});

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
		default: 'Henry Waill',
		template: '%s | Henry Waill'
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
				{children}
			</body>
			<GoogleAnalytics gaId='G-0T2H3H83B4' />
		</html>
	);
};