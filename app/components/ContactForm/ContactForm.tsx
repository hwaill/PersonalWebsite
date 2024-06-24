"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '@/utils/sendEmail'
import { EmailData } from '@/app/types'

import style from "./contactForm.module.css"



export default function ContactForm() {
	const [formState, setFormState] = useState("ready");
	const [responseState, setResponseState] = useState("");
	const {register, handleSubmit} = useForm<EmailData>();

	function onSubmit(data: EmailData) {
		sendEmail(data, setFormState, setResponseState);
	}

	return (
    <form className={style.formContainer + " neu"} onSubmit={handleSubmit(onSubmit)}>
			<h3 className={style.formHeading}>Contact Form</h3>
      <div className={style.formSection}>
        <label htmlFor="name" className={style.formLabel}>Full Name</label>
        <input type="text"
          placeholder="Full Name"
          className={style.formInput + " neuInset"}
          {...register('name', { required: true })}
        />
      </div>
      <div className={style.formSection}>
        <label
          htmlFor="email"
          className={style.formLabel}
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className={style.formInput + " neuInset"}
          {...register('email', { required: true })}
        />
      </div>
      <div className={style.formSection}>
        <label
          htmlFor="message"
          className={style.formLabel}
        >
          Message
        </label>
        <textarea
          rows={6}
          placeholder="Type your message"
          className={style.formTextArea + " neuInset"}
          {...register('message', { required: true })}
        ></textarea>
      </div>
      <div className={style.formSubmitContainer}>
        <div className={style.formStatus}>
          {formState == "ready" ? "" : (formState == "waiting" ? "Sending message..." : responseState)}
        </div>
        <button className={style.formButton} style={formState == "ready" ? {} : {"opacity":"0.5","pointerEvents":"none"}}>
          Submit
        </button>
      </div>
			<div className={style.formClearFix}></div>
    </form>
  );
}