import { httpGet } from '../../network/http.client';

export async function getAllProjects() {
	return await httpGet('/projects');
}

export async function getProjectById(id: number) {
	return await httpGet(`/projects/${id}`);
}
