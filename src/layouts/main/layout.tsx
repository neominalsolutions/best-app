/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Col, Dropdown, Layout, Row, Space, theme } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router';
import { SessionContext } from '../../contexts/session.context';

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

	const sessionState = React.useContext(SessionContext);

	return (
		<Layout>
			<Header style={headerStyle}>
				<Row>
					<Col span={12} style={{ textAlign: 'left' }}>
						Best App
					</Col>
					{sessionState.session.isAuthenticated && (
						<Col span={12} style={{ textAlign: 'right' }}>
							<Dropdown
								menu={{
									items: [
										{
											key: 'profile',
											label: <Link to="/profile">Profile</Link>,
										},
										{ key: 'logout', label: 'Logout' },
									],
									onClick: (info: any) => {
										if (info.key === 'logout') {
											sessionState.signOut();
										}
									},
								}}
								trigger={['click']}
							>
								<a
									onClick={(e) => e.preventDefault()}
									style={{ color: '#fff' }}
								>
									<Space>
										<Avatar style={{ backgroundColor: '#1677ff' }}>
											{sessionState.session.userName?.charAt(0).toUpperCase()}
										</Avatar>
										<span>{sessionState.session.userName}</span>
									</Space>
								</a>
							</Dropdown>
						</Col>
					)}
					{!sessionState.session.isAuthenticated && (
						<Col span={12} style={{ textAlign: 'right' }}>
							<Link to="/login" style={{ color: '#fff' }}>
								Login
							</Link>
						</Col>
					)}
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
