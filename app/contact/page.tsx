import React from 'react'
import ContactForm from '../components/ContactForm/ContactForm'

function Contact() {
	return (
		<div className="pageTopMargin">
			<div className="homePageSection">
				<h2 className="blueText">Contact me</h2>
				<div className="contactMeContent">
					<div className="contactMeText">
						<h3>adfdasfasdf</h3>
						<p>I think I&apos;m a really likable guy! On the rare occasion, I&apos;ve even been told I&apos;m funny and intelligent... but you will learn <em>none of that</em> from the following paragraphs.</p>
						<p>My name is still Henry! I&apos;m an engineer and designer with a B.S. degree in Creative Technology and Design. I enjoy solving problems through programming, electronics, physical fabrication, web development and graphic design, among many other avenues. I love both learning and creating, both for their own sakes and for the sake of helping to solve all sorts of problems.</p>
						<p>I also enjoy playing piano, weaving, hiking with my dog and rock climbing.</p>
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