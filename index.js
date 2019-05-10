import React from 'react';
import Select from 'react-select';
import { keyBy } from 'lodash';

export default props => {
	const { defaultValue = 'all', editable = false, id, list, onChange, style, ...defaultProps } = props;

	let options = [];
	if (editable) {
		options = list.map(d => ({ label: d, value: d }));
	}
	let optionsObj = keyBy(options, 'value');

	return {
		...defaultProps,
		style: { ...style, overflow: editable ? 'visible' : 'hidden' },
		Cell: ({ original, value }) => {
			if (editable) {
				return (
					<Select
						value={optionsObj[value] ? optionsObj[value] : null}
						onChange={e => onChange(e ? { Id: original.Id, [id]: e.value } : null)}
						options={options}
					/>
				);
			}

			return value;
		},
		Filter: ({ filter, onChange }) => {
			const optionsFilter = [{ label: 'All', value: 'all' }, ...options],
				optionsFilterObj = keyBy(optionsFilter, 'value');

			return (
				<Select
					isClearable
					value={
						filter
							? optionsFilterObj[filter.value]
								? optionsFilterObj[filter.value]
								: optionsFilterObj[defaultValue]
							: optionsFilterObj[defaultValue]
					}
					onChange={e => onChange(e ? e.value : '')}
					options={optionsFilter}
				/>
			);
		}
	};
};
