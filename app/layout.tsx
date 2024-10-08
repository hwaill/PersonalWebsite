import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google';
import './css/main.css';
import Navigation from './components/Navigation/Navigation';
import NavigationMobile from './components/Navigation/NavigationMobile';
import PageContentWrapper from './components/Wrappers/PageContentWrapper';

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
				<Navigation />
				<NavigationMobile />
				<PageContentWrapper>
					{children}
				</PageContentWrapper>
			</body>
			<GoogleAnalytics gaId='G-0T2H3H83B4' />
		</html>
	);
};
