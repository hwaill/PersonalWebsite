import { EB_Garamond } from "next/font/google";
import { figtree } from "../layout";

export const garamond = EB_Garamond({
	subsets: ['latin'],
});

export default function Layout({ children }: {children: React.ReactNode }) {
	return (
		<>
			<main className={figtree.className}>
				{children}
			</main>
		</>
	);
}