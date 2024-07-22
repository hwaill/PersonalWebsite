import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google';
import './css/main.css';
import Navigation from './components/Navigation/Navigation';
import NavigationMobile from './components/Navigation/NavigationMobile';
import ContentWrapper from './components/Wrappers/ContentWrapper';

const openSans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
	height: 'device-height',
  width: 'device-width',
  initialScale: 1,
	minimumScale: 1
};

export const metadata: Metadata = {
	title: {
		default: 'Henry Waill',
		template: '%s | Henry Waill'
	},
	description: 'A personal site.'
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
				<ContentWrapper>
					{children}
				</ContentWrapper>
			</body>
			<GoogleAnalytics gaId='G-0T2H3H83B4' />
		</html>
	);
};
