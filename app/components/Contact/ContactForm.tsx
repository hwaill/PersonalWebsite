"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '@/utils/sendEmail'
import { EmailData } from '@/app/types'

import style from "./contact.module.css"



export default function ContactForm() {
	const [formState, setFormState] = useState("ready");
	const [responseState, setResponseState] = useState("");
	const {register, handleSubmit} = useForm<EmailData>();

	function onSubmit(data: EmailData) {
		sendEmail(data, setFormState, setResponseState);
	}

	return (
    <form className={style.contactFormContainer + " neuLargeScreen neuDoublePadding"} onSubmit={handleSubmit(onSubmit)}>
			<h3>Contact Form</h3>
      <div className={style.contactFormSection}>
        <label htmlFor="name" className={style.contactFormLabel}>Full Name</label>
        <input type="text"
          placeholder="Full Name"
          className={style.contactFormInput + " neuInset"}
          id="name"
          {...register('name', { required: true })}
        />
      </div>
      <div className={style.contactFormSection}>
        <label
          htmlFor="email"
          className={style.contactFormLabel}
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className={style.contactFormInput + " neuInset"}
          id="email"
          {...register('email', { required: true })}
        />
      </div>
      <div className={style.contactFormSection}>
        <label
          htmlFor="message"
          className={style.contactFormLabel}
        >
          Message
        </label>
        <textarea
          rows={6}
          placeholder="Type your message"
          className={style.contactFormTextArea + " neuInset"}
          id="message"
          {...register('message', { required: true })}
        ></textarea>
      </div>
      <div className={style.contactFormSubmitContainer}>
        <div className={style.contactFormStatus}>
          {formState == "ready" ? "" : (formState == "waiting" ? "Sending message..." : responseState)}
        </div>
        <button className={style.contactFormButton} style={formState == "ready" ? {} : {"opacity":"0.5","pointerEvents":"none"}}>
          Submit
        </button>
      </div>
			<div className={style.contactFormClearFix}></div>
    </form>
  );
}