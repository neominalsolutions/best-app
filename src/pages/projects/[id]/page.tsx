/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Input, Row, type InputRef } from 'antd';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useParams } from 'react-router';
import type { DataType } from '../list/page';
import { getProjectById } from '../../../services/projects/project.client';

function ProjectFormPage() {
	const params = useParams(); // {id: '1'} // dinamik değer yakalama functionı
	console.log('params', params);
	// Not: Antd form yönetimi
	const [form] = Form.useForm();

	useEffect(() => {
		getProjectById(Number(params.id)).then((data) => {
			form.setFieldsValue(data);
		});

		// fetch(`https://localhost:7109/api/projects/${params.id}`)
		// 	.then((response) => response.json())
		// 	.then((json) => {
		// 		// veri çekilince formu doldur.
		// 		form.setFieldsValue(json);
		// 	})
		// 	.catch((error) => console.error('Error fetching data:', error));
	}, []);

	/*  <Input value={data?.projectId} type="number" tabIndex={1} ref={input2Ref} placeholder="Project ID" onKeyDown={(e) => handleKeyDown(e, input3Ref)}
								/>
	*/

	const input2Ref = useRef<InputRef>(null);
	const input3Ref = useRef<InputRef>(null);

	// entera basınca sonraki inputa geçmek function
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, nextRef: any) => {
		console.log('nextRef', nextRef);

		if (e.key === 'Enter' && nextRef?.current) {
			console.log('Enter pressed', nextRef.current);
			nextRef.current.focus();
		}
	};

	const onFinish = (values: DataType) => {
		console.log('Form gönderildi:', values);
		// api send.
	};

	return (
		<>
			<Form
				form={form}
				onFinish={onFinish} // formun submit edildiği an
				layout="vertical"
				initialValues={{ layout: 'vertical' }}
				onValuesChange={() => {
					// value değişimini takip edip buna göre hesaplama vs yapmak istersek kullanabiliriz.
					console.log('projectId-value takip', form.getFieldValue('projectId'));
					console.log('Form values changed', form.getFieldsValue());
					// form.setFieldValue('projectNumber', 'Deneme ' + form.getFieldValue('projectId'));
				}}
				style={{ maxWidth: 'none' }}
			>
				<Row gutter={24}>
					<Col span={8}>
						<Card style={{ padding: 5 }} title="Sutun 1" variant="outlined">
							<Form.Item
								name="projectId"
								label="Project ID"
								getValueFromEvent={(e) => Number(e.target.value)}
							>
								<Input
									type="number"
									tabIndex={1}
									ref={input2Ref}
									placeholder="Project ID"
									onKeyDown={(e) => handleKeyDown(e, input3Ref)}
								/>
							</Form.Item>
							<Form.Item name="projectNumber" label="Project Number">
								<Input
									type="text"
									tabIndex={2}
									ref={input3Ref}
									placeholder="Project Number"
									onKeyDown={(e) => handleKeyDown(e, input3Ref)}
								/>
							</Form.Item>
						</Card>
					</Col>

					<Col span={8}>
						<Card style={{ padding: 5 }} title="Sutun 2" variant="outlined">
							<Form.Item
								getValueFromEvent={(e) => Number(e.target.value)}
								name="transformerPower"
								label="Transformer Power"
							>
								<Input type="number" placeholder="Transformer Power" />
							</Form.Item>
							<Form.Item name="stockCode" label="Stock Code">
								<Input type="text" placeholder="Stock Code" />
							</Form.Item>
						</Card>
					</Col>

					<Col span={8}>
						<Card style={{ padding: 5 }} title="Sutun 3" variant="outlined">
							<Form.Item
								name="highVoltage"
								label="High Voltage"
								getValueFromEvent={(e) => Number(e.target.value)}
							>
								<Input type="number" placeholder="High Voltage" />
							</Form.Item>
							<Form.Item
								getValueFromEvent={(e) => Number(e.target.value)}
								name="lowVoltage"
								label="Low Voltage"
							>
								<Input type="number" placeholder="Low Voltage" />
							</Form.Item>
						</Card>
					</Col>

					<Col
						span={24}
						style={{ display: 'flex', justifyContent: 'right', padding: 10 }}
					>
						<Button color="cyan" variant="solid" htmlType="submit">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}

// form içerisinde ki button htmlType="submit" bu olmaz ise form submit olmaz.
// numeric alanlarda antd default form input değişnce string yapıyor bunu engellemek için getValueFromEvent kullanıyoruz. getValueFromEvent={(e) => Number(e.target.value)}

export default ProjectFormPage;
