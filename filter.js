import React, { memo, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Input, List, Popover } from 'antd';
import { FilterFilled, FilterOutlined } from '@ant-design/icons';

const Filter = ({ column, id, list, setFilter }) => {
	const [selected, setSelected] = useState([]);
	const [newOptions, setNewOptions] = useState(['(Blank)', ...list]);
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const [sort, setSort] = useState('');
	const [selectedAll, setSelectedtAll] = useState(false);

	const withFilterValue = column.filterValue ? (column.filterValue.length !== 0 ? true : false) : false;

	useEffect(() => {
		if (!!column.filterValue) setSelected(column.filterValue['$in'].map(d => (d === '' ? '(Blank)' : d)));
	}, [JSON.stringify(column.filterValue)]);

	useEffect(() => {
		setSort(column.isSorted ? (column.isSortedDesc ? 'DESC' : 'ASC') : '');
	}, [column.isSorted, column.isSortedDesc]);

	useEffect(() => {
		setSelectedtAll(selected.length === list.length + 1 ? true : false);
	}, [selected.length]);

	const selectItem = value => {
		if (selected.includes(value)) setSelected(selected.filter(d => d !== value));
		else setSelected([...selected, value]);
	};

	const renderItem = item => {
		return (
			<List.Item style={{ cursor: 'pointer', padding: '5px 0px' }}>
				<Checkbox checked={selected.includes(item)} onChange={() => selectItem(item)}>
					{item}
				</Checkbox>
			</List.Item>
		);
	};

	const renderCount = () => {
		if (!column.filterValue) return null;
		if (!Array.isArray(column.filterValue)) return null;

		if (column.filterValue.length === 0) return null;
		return <span>({column.filterValue.length})</span>;
	};

	const handleSearch = value => {
		if (value === '') return setNewOptions(list);

		setNewOptions(list.filter(d => d.match(new RegExp(value, 'i'))));
	};

	const onOk = () => {
		setFilter(id, { $in: selected.map(d => (d === '(Blank)' ? '' : d)) });

		if (sort) column.toggleSortBy(sort === 'ASC' ? true : sort === 'DESC' ? false : '');
		else column.clearSortBy();
	};

	const onSelectAll = () => {
		if (selectedAll) return onClearAll();
		setSelected([...list, '(Blank)']);
		setSelectedtAll(true);
	};

	const onClearAll = () => {
		setSelected([]);
		setSelectedtAll(false);
	};

	const renderPopoverContent = () => {
		const a2zType = sort === 'ASC' ? 'primary' : 'default',
			z2aType = sort === 'DESC' ? 'primary' : 'default';

		return (
			<>
				<div>
					<h4>Sort</h4>
					<Button
						onClick={() => (sort !== 'ASC' ? setSort('ASC') : setSort(''))}
						type={a2zType}
						style={{ width: '49%' }}>
						A to Z
					</Button>
					<Button
						onClick={() => (sort !== 'DESC' ? setSort('DESC') : setSort(''))}
						type={z2aType}
						style={{ marginLeft: '2%', width: '49%' }}>
						Z to A
					</Button>
				</div>
				<Divider style={{ margin: '10px 0px' }} />
				<div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h4>Filter {renderCount()}</h4>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Checkbox checked={selectedAll} onClick={() => onSelectAll()} style={{ fontSize: '15px' }}>
								Select All
							</Checkbox>
							<Button onClick={() => onClearAll()} size="small" type="link" danger>
								Clear All
							</Button>
						</div>
					</div>
					<Input.Search
						allowClear
						onKeyUp={e => handleSearch(e.target.value)}
						onSearch={handleSearch}
						placeholder="Search"
					/>
					<List
						dataSource={newOptions}
						renderItem={renderItem}
						style={{ height: 150, overflowY: 'scroll' }}
					/>
				</div>
				<Divider style={{ margin: '10px 0px' }} />
				<div>
					<h4>Column Settings</h4>
					<Checkbox {...column.getToggleHiddenProps()}>Visible</Checkbox>
				</div>
				<Divider style={{ margin: '10px 0px' }} />
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '50%'
						}}>
						<Button onClick={closePopover} type="default">
							Cancel
						</Button>
						<Button onClick={onOk} type="primary">
							OK
						</Button>
					</div>
				</div>
			</>
		);
	};

	const openPopover = () => setIsPopoverVisible(true);
	const closePopover = () => setIsPopoverVisible(false);

	return (
		<Popover content={renderPopoverContent} trigger="click" visible={isPopoverVisible}>
			{withFilterValue ? (
				<FilterFilled onClick={openPopover} style={{ cursor: 'pointer' }} />
			) : (
				<FilterOutlined onClick={openPopover} style={{ cursor: 'pointer' }} />
			)}
		</Popover>
	);
};

export default memo(Filter);
