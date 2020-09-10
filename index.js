import React, { memo, Suspense } from 'react';
import { Skeleton } from 'antd';
import InputSelect from '@volenday/input-select';

export default ({ defaultValue = 'all', editable = false, id, list, multiple = false, onChange, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: props => (
			<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
				<Cell {...props} other={{ editable, id, list, multiple, onChange }} />
			</Suspense>
		),
		Filter: props => (
			<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
				<Filter {...props} other={{ id, list }} />
			</Suspense>
		)
	};
};

const Cell = memo(({ other: { editable, id, list, multiple, onChange }, row: { original }, value }) => {
	if (typeof value === 'undefined') return null;

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
});

const Filter = memo(({ column: { filterValue, setFilter }, other: { id, list } }) => {
	const listFilter = ['All', ...list];

	return (
		<InputSelect
			id="filter"
			list={listFilter}
			onChange={(e, field, value) => setFilter(value !== 'All' ? value : '')}
			withLabel={false}
			value={filterValue ? filterValue : 'All'}
		/>
	);
});
