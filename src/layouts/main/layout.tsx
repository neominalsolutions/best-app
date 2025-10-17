import { Col, Layout, Row, theme } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;

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
			<Header style={headerStyle}>
				<Row>
					<Col span={12} style={{ textAlign: 'left' }}>
						Best App
					</Col>
					<Col span={12} style={{ textAlign: 'right' }}>
						<Link to="/login" style={{ color: '#fff' }}>
							Login
						</Link>
					</Col>
				</Row>
			</Header>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<div style={{ marginRight: 16 }}>Deneme</div>
				<Link to="/about" style={{ color: '#fff', marginRight: 16 }}>
					About
				</Link>
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
