/* eslint-disable @typescript-eslint/no-explicit-any */
// Not: Eğer Role Admin değilse 403 sayfasına yönlendirecek.
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router';

const RoleAdminGuard: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const token = localStorage.getItem('token');
	if (token != null) {
		const decodedToken = jwtDecode<any>(token);
		if (!decodedToken.role.includes('admin')) {
			return <Navigate to="/403" replace />;
		}
	}
	return <>{children}</>;
};

export default RoleAdminGuard;
