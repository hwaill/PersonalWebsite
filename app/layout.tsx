import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';
import '@/app/css/main.css';
import { NavProvider } from '@/app/components/nav/NavContext';
import NavRail from '@/app/components/nav/NavRail';

const figtree = Figtree({
	subsets: ['latin'],
});

const gottakSemiBold = localFont({
	src: [{
		path: 'fonts/Gottak-SemiBold.woff',
		weight: '600',
		style: 'normal'
	},{
		path: 'fonts/Gottak-SemiBoldItalic.woff',
		weight: '600',
		style: 'italic'
	},{
		path: 'fonts/Gottak-Light.woff',
		weight: '300',
		style: 'normal'
	},{
		path: 'fonts/Gottak-LightItalic.woff',
		weight: '300',
		style: 'italic'
	},{
		path: 'fonts/Gottak-Thin.woff',
		weight: '100',
		style: 'normal'
	},{
		path: 'fonts/Gottak-ThinItalic.woff',
		weight: '100',
		style: 'italic'
	},{
		path: 'fonts/Gottak-ExtraLight.woff',
		weight: '200',
		style: 'normal'
	},{
		path: 'fonts/Gottak-ExtraLightItalic.woff',
		weight: '200',
		style: 'italic'
	},{
		path: 'fonts/Gottak-Bold.woff',
		weight: '700',
		style: 'normal'
	},{
		path: 'fonts/Gottak-BoldItalic.woff',
		weight: '700',
		style: 'italic'
	},{
		path: 'fonts/Gottak-Regular.woff',
		weight: '400',
		style: 'normal'
	},{
		path: 'fonts/Gottak-RegularItalic.woff',
		weight: '400',
		style: 'italic'
	}],
	variable: '--gottak'
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
		<html lang="en" className={figtree.className + " " + gottakSemiBold.variable}>
			<body>
				<NavProvider>
					<NavRail />
					{children}
				</NavProvider>
			</body>
			<GoogleAnalytics gaId='G-0T2H3H83B4' />
		</html>
	);
};