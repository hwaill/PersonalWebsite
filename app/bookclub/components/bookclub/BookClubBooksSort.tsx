"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import style from "../../bookClub.module.css"
import { BookSortParameters } from "@/app/types";
import { BOOK_SORT_NAMES } from "@/app/constants/constantsBookclub";

export default function BookClubBooksSort() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	function updateSearchParams(data: BookSortParameters) {
		const params = new URLSearchParams(searchParams);

		params.set("sortBy", data.sortBy);
		router.push(`${pathname}?${params.toString()}`);
	}

	var initialValues: BookSortParameters = {
		sortBy: searchParams.get('sortBy') || "0"
	};

	const {register, handleSubmit, watch} = useForm<BookSortParameters>(
		{defaultValues:initialValues}
	);

	function onSubmit(data: BookSortParameters) {
		updateSearchParams(data);
	}

	const currentSortBy = watch('sortBy');

	useEffect(() => {
		// Subscribe to changes in 'myRadioGroup'
		const subscription = watch((value, { name, type }) => {
			// Check if the change originated from the radio group
			if (name === 'sortBy' && type === 'change') {
				handleSubmit(onSubmit)(); // Call the submit handler
			}
		});
		return () => subscription.unsubscribe(); // Cleanup the subscription
	}, [watch, handleSubmit, onSubmit]); 

	return (
		<>
			<form className={style.bookClubBookSortForm} onSubmit={handleSubmit(onSubmit)}>
				{ BOOK_SORT_NAMES.map((key, index) => {
					return (
						<label className={style.bookClubBookSortLabel} key={key}>
							<input
								className={style.bookClubBookSortInput}
								{...register('sortBy')}
								type="radio"
								value={index.toString()}
							/>
							{ key }
						</label>
					);
				})}
			</form>
		</>
	)
};