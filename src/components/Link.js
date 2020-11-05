import React from 'react';

const Link = ({ href, className, children }) => {
	const onClick = (event) => {
		//allows clicked link to open in new tab
		if (event.metaKey || event.ctrlKey) {
			return;
		}
		//prevent full page refresh and change url
		event.preventDefault();
		window.history.pushState({}, '', href);

		const navEvent = new PopStateEvent('popstate');
		window.dispatchEvent(navEvent);
	};

	return (
		<a onClick={onClick} className={className} href={href}>
			{children}
		</a>
	);
};

export default Link;
