import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import APIKEY from '../config/config';

const Convert = ({ language, text }) => {
	const [translated, setTranslated] = useState('');
	const [debouncedText, setDebouncedText] = useState(text);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedText(text);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [text]);

	useEffect(() => {
		//make request to google api
		const doTranslation = async () => {
			const { data } = await axios.post(
				'https://translation.googleapis.com/language/translate/v2',
				{},
				{
					params: {
						q: text,
						target: language.value,
						key: APIKEY.translate,
					},
				}
			);
			setTranslated(data.data.translations[0].translatedText);
		};
		doTranslation();
	}, [language, text]);

	return (
		<div>
			<h1 className='ui header'>{translated}</h1>
		</div>
	);
};

export default Convert;