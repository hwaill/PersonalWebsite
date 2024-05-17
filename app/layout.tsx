import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './css/main.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Henry Waill',
		template: '%s | Henry Waill'
	},
	description: 'A personal site.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={openSans.className}>{children}</body>
		</html>
	);
}
