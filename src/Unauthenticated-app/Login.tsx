import React, { FormEventHandler, FormEvent } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'Unauthenticated-app';
export const LoginScreen = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { login, user } = useAuth(); // 用户名是从这里取出来的.

    const handleSubmit = (event: { username: string, password: string }) => {
        // name是由Form.item上面的name决定的
        const { username, password } = event;
        login({ username, password });
    }
    return <Form onFinish={handleSubmit}>
        {/* <div>
            {user ? `登录成功,用户名${user.name}` : null}
        </div> */}
        <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
            <Input />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input />
        </Form.Item>
        <Form.Item>
            <LongButton htmlType='submit' type={'primary'}>登录</LongButton>
        </Form.Item>
    </Form >
}
