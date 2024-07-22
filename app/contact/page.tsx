import React from 'react'
import ContactForm from '../components/ContactForm/ContactForm'
import { Metadata } from 'next';

export const metadata : Metadata = {
	title: "Contact Me",
	description: "Reach out to me with any questions and comments. I'd be happy to chat!"
};

function Contact() {
	return (
		<div className="pageTopMargin">
			<div className="homePageSection">
				<h2 className="blueText">Contact Me</h2>
				<div className="contactMeContent">
					<div className="contactMeText">
						<h3>I&apos;d love to hear from you!</h3>
						<p>Have any questions? Comments? Concerns? Feel free to send them my way.</p>
						<p>I am proud of the work I have on display on this site and would love to talk about any and all of it with whomever is interested! I am also always looking to learn and improve, so suggestions are certainly welcome as well.</p>
						<p>I will respond to all messages as promptly as I can. Thank you for spending time to check out my work.</p>
						<p>Henry</p>
					</div>
					<div className="contactFormContainer">
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact