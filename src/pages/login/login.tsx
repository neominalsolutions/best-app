import { Button, Form } from 'antd';
import { httpPost } from '../../network/http.client';
import { useNavigate } from 'react-router';

interface LoginRequest {
	username: string;
	password: string;
}

function LoginPage() {
	const [form] = Form.useForm();
	const navigate = useNavigate(); // sayfa reload etmeden yöneldirme işlemi.

	const onFinish = (values: LoginRequest) => {
		// api/auths/token -> token al
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		httpPost('/auths/token', values).then((res: any) => {
			// tokeni local storage kaydet
			localStorage.setItem('token', res['accessToken']);

			window.alert('Oturum açma başarılı!');

			setTimeout(() => {
				window.alert('Ana sayfaya yönlendiriliyorsunuz...');
				// anasayfaya yönlendir
				navigate('/');
			}, 500);
		});

		console.log('Received values:', values);
	};

	return (
		<Form form={form} onFinish={onFinish}>
			{/* Form items go here */}
			<Form.Item
				name="username"
				label="Username"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<input type="text" />
			</Form.Item>
			<Form.Item
				name="password"
				label="Password"
				rules={[
					{ required: true, message: 'Please input your password!' },
					{ min: 7, message: 'Password must be at least 7 characters long' },
				]}
			>
				<input type="password" />
			</Form.Item>
			<Form.Item>
				<Button variant="outlined" color="green" htmlType="submit">
					Oturum Aç
				</Button>
			</Form.Item>
		</Form>
	);
}

export default LoginPage;

// 1. adım login formu ayarladık
// 2. formun linkini /login yapalım.
