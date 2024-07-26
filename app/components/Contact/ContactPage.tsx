import ContactForm from "./ContactForm";

import style from "./contact.module.css"

export default function ContactPage() {

	return (
		<>
			<h2 className="blueText">Contact Me</h2>
			<div className={style.contactMeContent}>
				<div className={style.contactMeText}>
					<h3>I&apos;d love to hear from you!</h3>
					<p>Have any questions? Comments? Concerns? Feel free to send them my way.</p>
					<p>I am proud of the work I have on display on this site and would love to talk about any and all of it with whomever is interested! I am also always looking to learn and improve, so suggestions are certainly welcome as well.</p>
					<p>I will respond to all messages as promptly as I can. Thank you for spending time to check out my work.</p>
					<p>Henry</p>
				</div>
				<ContactForm />
			</div>
		</>
	)
}