import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const onBodyClick = (event) => {
			//if click is outside dropdown menu, close dropdown
			if (ref.current && ref.current.contains(event.target)) {
				return;
			}
			setOpen(false);
		};
		//set up listener for a click on the body
		document.body.addEventListener('click', onBodyClick);

		//clean up click listener so it doesn't screw anything up
		return () => {
			document.body.removeEventListener('click', onBodyClick);
		};
	}, []);

	const renderedOptions = options.map((option) => {
		//won't display currently selected as dropdown option
		if (option.value === selected.value) {
			return null;
		}
		return (
			<div
				key={option.value}
				className='item'
				onClick={() => onSelectedChange(option)}>
				{option.label}
			</div>
		);
	});

	return (
		<div ref={ref} className='ui form container'>
			<div className='field'>
				<label className='label'>Select A Color</label>
				{/* if selected hide option in menu */}
				<div
					onClick={() => setOpen(!open)}
					className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
					<i className='dropdown icon'></i>
					<div className='text'>{selected.label}</div>
					{/* if open is true show menu, if not hide */}
					<div className={`menu ${open ? 'visible transition' : ''}`}>
						{renderedOptions}
					</div>
				</div>
			</div>
			<p style={{ color: selected.value }}>This text is {selected.label}. </p>
		</div>
	);
};

export default Dropdown;
