'use client';

import React, { useState, useEffect } from 'react';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { EmailData } from '@/app/types';

type FormData = EmailData & { challenge: string };

function UnderField({
	label,
	fieldId,
	type = 'text',
	multiline = false,
	error,
	hint,
	placeholder,
	registration,
}: {
	label: React.ReactNode;
	fieldId?: string;
	type?: string;
	multiline?: boolean;
	error?: string;
	hint?: string;
	placeholder?: string;
	registration: UseFormRegisterReturn;
}) {
	const id = fieldId ?? (typeof label === 'string' ? `contact-${label.toLowerCase().replace(/\s+/g, '-')}` : 'contact-field');
	return (
		<div className={`underField${error ? ' hasError' : ''}`}>
			<label htmlFor={id}>{label}</label>
			{multiline ? (
				<textarea id={id} placeholder={placeholder ?? ''} {...registration} />
			) : (
				<input id={id} type={type} placeholder={placeholder ?? ''} {...registration} />
			)}
			{error && <span className="fieldError">{error}</span>}
			{!error && hint && <span className="fieldHint">{hint}</span>}
		</div>
	);
}

export default function Contact() {
	const [sendState, setSendState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
	const [errorMsg, setErrorMsg] = useState('');
	const [a, setA] = useState<number | null>(null);
	const [b, setB] = useState<number | null>(null);

	useEffect(() => {
		setA(Math.floor(Math.random() * 9) + 1);
		setB(Math.floor(Math.random() * 9) + 1);
	}, []);

	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		setSendState('sending');
		try {
			const res = await fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
			});
			const json = await res.json();
			if (res.ok) {
				setSendState('success');
			} else {
				setSendState('error');
				setErrorMsg(json.message || 'Something went wrong — please try again.');
			}
		} catch {
			setSendState('error');
			setErrorMsg('Failed to send — please try again.');
		}
	}

	return (
		<div className="pageSection">
			<h1>Contact Me</h1>
			<h2>I promise I&apos;m friendly.</h2>
			<div className="contactGrid">
				<div>
					<p>Have any questions? Comments? Concerns? Feel free to send them my way.</p>
					<p>I am proud of the work I have on display and would love to talk about any and all of it with whomever is interested! I am also always looking to learn and improve, so suggestions are certainly welcome.</p>
					<p>I will respond to all messages as promptly as I can. Thank you for spending time to check out my work.</p>
					<div className="contactSocials">
						<a href="https://www.linkedin.com/in/henrywaill/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<div className="socialIcon socialIcon--linkedin" />
						</a>
						<a href="https://www.instagram.com/henrywaill" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
							<div className="socialIcon socialIcon--instagram" />
						</a>
					</div>
				</div>
				<div>
					{sendState === 'success' ? (
						<div className="contactFadeUp">
							<h3>Message sent.</h3>
							<h4>Thanks for reaching out! I&apos;ll be in touch soon.</h4>
						</div>
					) : (
						<form className="contactForm" onSubmit={handleSubmit(onSubmit)} noValidate>
							<div>
								<h3>Send a message</h3>
								<h4>I&apos;ll get back to you as soon as I can.</h4>
							</div>
							<div className="contactFormFields">
								<UnderField
									label="Name"
									placeholder="Henry Waill"
									registration={register('name', { required: 'Name is required.' })}
									error={errors.name?.message}
								/>
								<UnderField
									label="Email"
									type="email"
									placeholder="henry@example.com"
									registration={register('email', {
										required: 'Email is required.',
										pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
									})}
									error={errors.email?.message}
								/>
								<UnderField
									label="Message"
									multiline
									placeholder="What's on your mind?"
									registration={register('message', { required: 'Message is required.' })}
									error={errors.message?.message}
								/>
								<UnderField
									label={
										<>
											What is{' '}
											<span style={{ opacity: a !== null ? 1 : 0, transition: 'opacity 0.25s ease' }}>
												{a ?? 0} + {b ?? 0}
											</span>
											?
										</>
									}
									fieldId="contact-challenge"
									placeholder="Answer"
									registration={register('challenge', {
										required: 'Please complete the verification.',
										validate: v => a === null || b === null
											? 'Verification not ready.'
											: parseInt(v, 10) === a + b || 'Incorrect — try again.',
									})}
									error={errors.challenge?.message}
								/>
							</div>
							{sendState === 'error' && (
								<span className="fieldError">{errorMsg}</span>
							)}
							<button
								type="submit"
								className="contactSubmitBtn"
								disabled={sendState === 'sending'}
								style={sendState === 'sending' ? { opacity: 0.5, pointerEvents: 'none' } : {}}
							>
								{sendState === 'sending' ? 'Sending...' : 'Send message'}
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
