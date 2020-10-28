import React, { useState, useEffect } from 'react';
import axios from 'axios';
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Search = () => {
	const [term, setTerm] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				},
			});
			setResults(data.query.search);
		};

		//delay request until user stops typing
		const timeoutId = setTimeout(() => {
			if (term) {
				search();
			}
		}, 500);
		//clear timeout when user types
		return () => {
			clearTimeout(timeoutId);
		};
	}, [term]);

	const renderedResults = results.map((result) => {
		return (
			<div key={result.pageid} className='item'>
				<div className='right floated content'>
					<a
						className='ui button'
						href={`https://en.wikipedia.org?curid=${result.pageid}`}>
						Go
					</a>
				</div>
				<div className='content'>
					<div className='header'>{result.title}</div>
					<span
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(result.snippet),
						}}></span>
				</div>
			</div>
		);
	});

	return (
		<div className='ui form'>
			<div className='field'>
				<label>Enter Search Term</label>
				<input
					className='input'
					value={term}
					onChange={(e) => setTerm(e.target.value)}
				/>
			</div>
			<div className='ui celled list'>{renderedResults}</div>
		</div>
	);
};

export default Search;
