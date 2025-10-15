import React from 'react';
import { Input, Table } from 'antd';
import { Link } from 'react-router';
import type { TableColumnsType, TableProps } from 'antd';

export interface DataType {
	projectId: number;
	projectNumber: string;
	stockCode: string;
	transformerPower: number;
	highVoltage: number;
	lowVoltage: number;
}

const columns: TableColumnsType<DataType> = [
	{
		title: 'projectNumber',
		dataIndex: 'projectNumber',
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
			<Input
				placeholder="Ara..."
				value={selectedKeys[0]}
				onChange={(e) =>
					setSelectedKeys(e.target.value ? [e.target.value] : [])
				}
				onPressEnter={() => confirm()}
				style={{
					width: 188,
					marginBottom: 8,
					display: 'block',
					padding: 6,
					margin: 5,
				}}
			/>
		),
		onFilter: (value: boolean | React.Key, record) =>
			record.projectNumber.toLowerCase().includes(String(value).toLowerCase()),
		sorter: (a, b) => a.projectNumber.length - b.projectNumber.length,
		width: '30%',
	},
	{
		title: 'stockCode',
		dataIndex: 'stockCode',
		sorter: (a, b) => a.stockCode.length - b.stockCode.length,
	},
	{
		title: 'transformerPower',
		dataIndex: 'transformerPower',
		onFilter: (value, record) =>
			record.transformerPower.toString().startsWith(value as string),
		sorter: (a, b) => a.transformerPower - b.transformerPower,
		filterSearch: true,
		width: '40%',
	},
	{
		title: 'Detay',
		key: 'action',
		render: (_, record) => (
			<Link to={`/projects/${record.projectId}`}>Detay</Link>
		),
		width: '10%',
	},
];

function ProjectListPage() {
	const [data, setData] = React.useState<DataType[]>([]);

	React.useEffect(() => {
		fetch('https://localhost:7109/api/projects')
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const onChange: TableProps<DataType>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<>
			<Table<DataType>
				pagination={{
					showSizeChanger: true,
					pageSizeOptions: [5, 10, 20, 50],
					defaultPageSize: 5,
					locale: { items_per_page: 'adet / sayfa' },
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} / ${total} kayıt`, // toplam gösterimi
				}}
				columns={columns}
				dataSource={data}
				onChange={onChange}
			/>
		</>
	);
}

export default ProjectListPage;
