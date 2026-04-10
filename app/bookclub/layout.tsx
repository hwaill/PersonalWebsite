import { EB_Garamond } from "next/font/google";
import { figtree } from "../layout";

export const garamond = EB_Garamond({
	subsets: ['latin'],
	variable: '--garamond'
});

export default function Layout({ children }: {children: React.ReactNode }) {
	return (
		<>
			<main className={figtree.className + garamond.variable}>
				{children}
			</main>
		</>
	);
}