/* eslint-disable @typescript-eslint/no-explicit-any */
// Amaç bütün Http isteklerini tek bir yerden yönetmekmek.

import axios from 'axios';
// Böylece istek atma şeklimizi değiştirmek istediğimizde sadece bu dosyayı değiştiririz.
const axiosClient = axios.create({
	baseURL: 'https://localhost:7109/api', // tüm istekler için ortak base url
	timeout: 5000, // 5 saniye timeout
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// API GET
export async function httpGet<T>(url: string, config?: any): Promise<T> {
	const headers = {
		'Custom-Header': 'CustomHeaderValue', // Örnek özel header
	};

	const response = await axiosClient.get<T>(url, { ...config, headers });
	return response.data;
}

// API POST
export async function httpPost<T>(
	url: string,
	data: any,
	config?: any
): Promise<T> {
	const headers = {
		'Custom-Header': 'CustomHeaderValue', // Örnek özel header
	};

	const response = await axiosClient.post<T>(url, data, { ...config, headers });
	return response.data;
}

// Interceptors örneği
// Request Interceptor -> istek atılmadan önce çalışır
axiosClient.interceptors.request.use(
	(config) => {
		// İstekten önce yapılacak işlemler
		console.log('Request sent at:', new Date().toISOString());
		return config;
	},
	(error) => {
		// İstek hatası işlemleri
		console.error('Request error:', error);
		return Promise.reject(error);
	}
);

// Response Interceptor -> istek geldikten sonra çalışır
axiosClient.interceptors.response.use(
	(response) => {
		// Yanıt alındıktan sonra yapılacak işlemler
		console.log('Response received at:', new Date().toISOString());
		return response;
	},
	(error) => {
		// Yanıt hatası işlemleri
		console.error('Response error:', error);
		return Promise.reject(error);
	}
);

// config -> httpheaderdan değer göndermek istediğimizde kullanabiliriz.
// Ör: yetkilendirme tokenı
// { headers: { Authorization: 'Bearer ' + token } }
// Benzer şekilde put, delete gibi methodlar da eklenebilir.
