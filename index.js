import React from 'react';

export default props => {
	const { defaultValue = 'all', enumProps = {}, Menu, page, list, ...defaultProps } = props;

	return {
		...defaultProps,
		Cell: props => {
			return props.value;
		},
		Filter: ({ filter, onChange }) => (
			<div style={{ width: '100%' }}>
				<select onChange={e => onChange(e.target.value)} value={filter ? filter.value : defaultValue}>
					<option value="all">All</option>
					{list.map(d => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
				<a
					title="Clear Filtering."
					style={{ marginLeft: '4px' }}
					class="fa fa-chain-broken"
					onClick={() => onChange('')}
				/>
			</div>
		)
	};
};
