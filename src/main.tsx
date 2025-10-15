import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './layouts/main/layout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ProjectListPage from './pages/projects/list/page';
import ProjectFormPage from './pages/projects/[id]/page';

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
				path: '/projects/:id', // projects/1
				Component: ProjectFormPage,
			},
		]
	},
]);

// RouterProvider uygulama genelindeki routeları yöneteten react router component

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
