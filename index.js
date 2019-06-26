import React from 'react';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';

export default props => {
	const {
		defaultValue = 'all',
		editable = false,
		headerStyle = {},
		id,
		list,
		onChange,
		style = {},
		...defaultProps
	} = props;

	let options = [];
	if (editable) {
		options = list.map(d => ({ label: d, value: d }));
	}
	let optionsObj = keyBy(options, 'value');

	return {
		...defaultProps,
		style: { ...style, overflow: editable ? 'visible' : 'hidden', display: 'flex', alignItems: 'center' },
		headerStyle: {
			...headerStyle,
			overflow: editable ? 'visible' : 'hidden',
			display: 'flex',
			alignItems: 'center'
		},
		Cell: ({ index, original, value }) => {
			if (editable) {
				return (
					<Select
						inputId={`${id}-${index}-cell`}
						value={optionsObj[value] ? optionsObj[value] : null}
						onChange={e => onChange(e ? { Id: original.Id, [id]: e.value } : null)}
						options={options}
						styles={{ container: (provided, state) => ({ ...provided, flex: 1 }) }}
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
					inputId={`${id}-filter`}
					value={
						filter
							? optionsFilterObj[filter.value]
								? optionsFilterObj[filter.value]
								: optionsFilterObj[defaultValue]
							: optionsFilterObj[defaultValue]
					}
					onChange={e => onChange(e ? e.value : '')}
					options={optionsFilter}
					styles={{ container: (provided, state) => ({ ...provided, flex: 1 }) }}
				/>
			);
		}
	};
};
