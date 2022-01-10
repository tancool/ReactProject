import { useAuth } from 'context/auth-context';
import React, { FormEventHandler, FormEvent } from 'react';
import { Button, Form, Input } from "antd";
import { LongButton } from 'Unauthenticated-app';
export const RegisterScreeen = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, user } = useAuth(); // 用户名是从这里取出来的.

    const handleSubmit = (data: { username: string, password: string }) => {
        const { username, password } = data;
        register({ username, password });
    }
    return <Form onFinish={handleSubmit}>
        {/* <Form.Item>
            {user ? `登录成功,用户名${user.name}` : null}
        </Form.Item> */}
        <Form.Item name='username'>
            <Input type="text" id={'username'} />
        </Form.Item>
        <Form.Item name='password'>
            <Input type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <LongButton htmlType='submit' type='primary'>注册</LongButton>
        </Form.Item>
    </Form>
}
