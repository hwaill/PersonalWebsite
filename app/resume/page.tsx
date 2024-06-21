import { Metadata } from 'next'
import React from 'react'
import Resume from '../components/HomePage/Resume/Resume';

export const metadata : Metadata = {
	title: "Resume"
};

export default function Page() {
	return (
		<div className="pageTopMargin">
			<Resume />
		</div>
	)
}