import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { SessionContextProvider } from './contexts/session.context';
import MainLayout from './layouts/main/layout';
import AboutPage from './pages/about/page';
import LoginPage from './pages/login/login';
import ProjectFormPage from './pages/projects/[id]/page';
import ProjectListPage from './pages/projects/list/page';

const router = createBrowserRouter([
	{
		path: '',
		Component: MainLayout,
		children: [
			{
				index: true, // uygulama ilk açlıdığında home page olarak project list göster
				Component: ProjectListPage,
			},
			{
				path: '/projects',
				Component: ProjectListPage,
			},
			{
				path: '/about',
				Component: AboutPage,
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