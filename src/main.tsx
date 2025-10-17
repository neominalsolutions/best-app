import { Typography } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { SessionContextProvider } from './contexts/session.context';
import MainLayout from './layouts/main/layout';
import LoginPage from './pages/login/login';
import ProjectFormPage from './pages/projects/[id]/page';
import ProjectListPage from './pages/projects/list/page';
import AuthGuard from './guard/auth.guard';

const router = createBrowserRouter([
	{
		path: '',
		Component: MainLayout,
		children: [
			{
				index: true, // uygulama ilk açlıdığında home page olarak project list göster
				// Authorize attribute benzer bir kontrol ekledik
				element: (
					<AuthGuard>
						<ProjectListPage />
					</AuthGuard>
				),
			},
			{
				path: '/projects',
				element: (
					<AuthGuard>
						<ProjectListPage />
					</AuthGuard>
				),
			},
			{
				path: '/about',
				element: <Typography itemType="secondary">About Page</Typography>,
			},
			{
				path: '/projects/:id', // projects/1
				Component: ProjectFormPage,
			},
			{
				path: '/login',
				Component: LoginPage,
			},
		],
	},
	{
		path: '/403',
		element: <Typography itemType="danger">403 - Access Denied</Typography>,
	},
	{
		path: '*', // hiçbir path ile eşleşmezse 404 sayfasını göster
		element: <Typography itemType="danger">404 - Sayfa Bulunamadı</Typography>,
	},
]);

// RouterProvider uygulama genelindeki routeları yöneteten react router component

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SessionContextProvider>
			<RouterProvider router={router} />
		</SessionContextProvider>
	</StrictMode>
);

// Tüm route sayalarından session bilgilerine erişmek için Context Provider ile sarmalladık
// 2. adım context yazıldıktan sonra provider ile sarmallama işlemi yapılır
