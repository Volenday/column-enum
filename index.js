import React, { memo, Suspense } from 'react';
import { Skeleton } from 'antd';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

import Filter from './filter';

const ColumnEnum = ({ id, list, loading = false, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Cell {...props} />
				</Suspense>
			) : null,
		Filter: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Filter {...props} id={id} list={list} loading={loading} />
				</Suspense>
			) : null
	};
};

const Cell = memo(({ value }) => {
	if (typeof value === 'undefined') return null;

	return <span>{value}</span>;
});

export default ColumnEnum;
