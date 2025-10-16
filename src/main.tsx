import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './layouts/main/layout';
import {
	createBrowserRouter,
	createHashRouter,
	RouterProvider,
} from 'react-router';
import ProjectListPage from './pages/projects/list/page';
import ProjectFormPage from './pages/projects/[id]/page';
import AboutPage from './pages/about/page';

const routes = [
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
		],
	},
];

// Electron prod (file://) için hash router kullan, web/dev için browser router
const router =
	window.location.protocol === 'file:'
		? createHashRouter(routes)
		: createBrowserRouter(routes);

// RouterProvider uygulama genelindeki routeları yöneteten react router component

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
