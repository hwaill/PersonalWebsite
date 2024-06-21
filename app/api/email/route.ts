import { NextRequest, NextResponse } from "next/server";

import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
	const { email, name, message} = await request.json();

	const transport = nodemailer.createTransport({
		service: 'Outlook365',
		auth: {
			user: process.env.EMAIL_SENDER,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions: Mail.Options = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECIPIENT,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}