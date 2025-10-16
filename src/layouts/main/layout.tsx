import { Layout, Menu, theme } from 'antd';
import React from 'react';
import { Outlet, Link } from 'react-router';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 15 }).map((_, index) => ({
	key: index + 1,
	label: `nav ${index + 1}`,
}));

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	height: 64,
	paddingInline: 48,
	fontSize: 36,
	lineHeight: '64px',
	backgroundColor: '#4096ff',
};

const MainLayout: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout>
			<Header style={headerStyle}>Best Header</Header>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<div style={{ marginRight: 16 }}>Deneme</div>
				<Link to="/about" style={{ color: '#fff', marginRight: 16 }}>
					About
				</Link>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={items}
					style={{ flex: 1, minWidth: 0 }}
				/>
			</Header>
			<Content style={{ padding: '0 48px' }}>
				<div
					style={{
						background: colorBgContainer,
						minHeight: '70vh',
						padding: 24,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Best Design ©{new Date().getFullYear()} Created by Best
			</Footer>
		</Layout>
	);
};

export default MainLayout;
