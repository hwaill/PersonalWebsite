import { figtree } from "./layout";

export default function Page() {
	return (
		<main className="pageContent">
			<div className="homepageContent">
				<img className="logo" src="/img/logos/logoFlatTight.svg" />
				<h1>Hello<span className="blue">!</span></h1>
				<h2>My name is Henry Waill.</h2>
				<h2>I like making things that help people.</h2>
				<img className="tybalt" src="/img/decoration/TybaltHand.svg" />
				<p>test</p>
			</div>
		</main>
	);
};
