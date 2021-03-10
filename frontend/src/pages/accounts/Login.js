import React, { useState } from "react";
import { useHistory } from "react-router";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Form, Input, Button, notification, Card } from 'antd';
import axios from "axios";
import useLocalStorage from "utils/useLocalStorage"


export default function Login() {
    const history = useHistory();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({})

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});
            const data = { username, password };

            try {
                const response = await axios.post("http://localhost:8000/accounts/token/", data);
                const { data: { token: jwtToken } } = response;

                setJwtToken(jwtToken)

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                })
                // history.push("/accounts/login")  // TODO: 이동 주소
            } catch (error) {
                console.log(error)
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "로그인 페이지로 이동합니다.",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    })

                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages =>  { username: "m1 m2", password: []}
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                            acc[fieldName] = {
                                ValidityState: "error",
                                help: errors.join(" ")
                            };
                            return acc;
                        }, {})
                    )
                }
            }
        }
        fn();
    };

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete={"false"}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

