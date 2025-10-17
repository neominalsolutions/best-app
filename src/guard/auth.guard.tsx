import React from 'react';
import { Navigate } from 'react-router';

// Component içerisindeki kontrolü buraya yazdık.
// children ise korunmak istenen bileşenleri temsil eder.
// tokendan bilgiler sekron okunduğundan dolayı eğer token yoksa login sayfasına yönlendiren bir kontrol bileşeni yazdık.
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const token = localStorage.getItem('token');

	if (token == null) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};
export default AuthGuard;
