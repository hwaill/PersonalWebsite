import { EmailData } from "@/app/types";
import React from "react";

export function sendEmail(
	data: EmailData,
	setFormState: React.Dispatch<React.SetStateAction<string>>,
	setResponseState: React.Dispatch<React.SetStateAction<string>>
) {
	setFormState("waiting");
	const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(
		(res) => res.json()
	).then(
		(response) => {
			setFormState("complete");
      setResponseState(response.message);
    }
	).catch(
		(err) => {
			setFormState("complete");
      setResponseState(err);
    }
	);
}