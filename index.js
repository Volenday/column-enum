import React, { memo, Suspense } from 'react';
import { Skeleton } from 'antd';
import striptags from 'striptags';
import reactStringReplace from 'react-string-replace';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

import Filter from './filter';

const ColumnEnum = ({
	defaultValue = 'all',
	editable = false,
	id,
	list,
	loading = false,
	multiple = false,
	onChange,
	keywords,
	...defaultProps
}) => {
	return {
		...defaultProps,
		Cell: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Cell {...props} other={{ editable, id, list, multiple, onChange, keywords }} />
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

const removeHTMLEntities = text => {
	const span = document.createElement('span');
	return text.replace(/&[#A-Za-z0-9]+;/gi, entity => {
		span.innerHTML = entity;
		return span.innerText;
	});
};

const highlightsKeywords = (keywords, stripHTMLTags = false, toConvert) => {
	const strip = stripHTMLTags ? removeHTMLEntities(striptags(toConvert)) : toConvert;
	const replaceText = reactStringReplace(strip, new RegExp('(' + keywords + ')', 'gi'), (match, index) => {
		return (
			<span key={`${match}-${index}`} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
				{match}
			</span>
		);
	});

	return replaceText;
};

const Cell = memo(({ other: { editable, id, list, multiple, onChange, keywords }, row: { original }, value }) => {
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

	const finalValue = highlightsKeywords(keywords, true, value);
	return <span>{finalValue}</span>;
});

export default ColumnEnum;
