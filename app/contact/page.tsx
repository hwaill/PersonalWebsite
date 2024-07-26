import React from 'react'
import { Metadata } from 'next';
import ContactPage from '../components/Contact/ContactPage';

export const metadata : Metadata = {
	title: "Contact Me",
	description: "Reach out to me with any questions and comments. I'd be happy to chat!"
};

function Contact() {
	return (
		<div className="pageTopMargin">
			<div className="sectionContent">
				<ContactPage />
			</div>
		</div>
	)
}

export default Contact