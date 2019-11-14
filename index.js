import React from 'react';
import InputSelect from '@volenday/input-select';

export default props => {
	const {
		defaultValue = 'all',
		editable = false,
		headerStyle = {},
		id,
		list,
		multiple = false,
		onChange,
		style = {},
		...defaultProps
	} = props;

	return {
		...defaultProps,
		style: { ...style, overflow: editable ? 'visible' : 'hidden', display: 'flex', alignItems: 'center' },
		headerStyle: {
			...headerStyle,
			overflow: editable ? 'visible' : 'hidden',
			display: 'flex',
			alignItems: 'center'
		},
		Cell: ({ value }) => {
			if (typeof value == 'undefined') return null;

			if (editable) {
				return (
					<InputSelect
						id={id}
						list={list}
						multiple={multiple}
						onChange={(e, field, value) => onChange({ Id: original.Id, [field]: value })}
						withLabel={false}
						value={value}
					/>
				);
			}

			return value;
		},
		Filter: ({ filter, onChange }) => {
			const listFilter = ['All', ...list];

			return (
				<InputSelect
					id={`${id}-filter`}
					list={listFilter}
					onChange={(e, field, value) => onChange(value)}
					withLabel={false}
					value={filter ? filter.value : null}
				/>
			);
		}
	};
};
