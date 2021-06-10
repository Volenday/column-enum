import React, { memo, Suspense } from 'react';
import { Skeleton } from 'antd';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

import Filter from './filter';

export default ({ defaultValue = 'all', editable = false, id, list, multiple = false, onChange, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Cell {...props} other={{ editable, id, list, multiple, onChange }} />
				</Suspense>
			) : null,
		Filter: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Filter {...props} id={id} list={list} />
				</Suspense>
			) : null
	};
};

const Cell = memo(({ other: { editable, id, list, multiple, onChange }, row: { original }, value }) => {
	if (typeof value === 'undefined') return null;

	if (editable) {
		const InputSelect = require('@volenday/input-select').default;
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
