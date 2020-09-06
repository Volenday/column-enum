import React from 'react';
import InputSelect from '@volenday/input-select';

export default ({ defaultValue = 'all', editable = false, id, list, multiple = false, onChange, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: ({ row: { original }, value }) => {
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

			return <span>{value}</span>;
		},
		Filter: ({ column: { filterValue, setFilter } }) => {
			const listFilter = ['All', ...list];

			return (
				<InputSelect
					id={`${id}-filter`}
					list={listFilter}
					onChange={(e, field, value) => setFilter(value !== 'All' ? value : '')}
					withLabel={false}
					value={filterValue ? filterValue : 'All'}
				/>
			);
		}
	};
};
