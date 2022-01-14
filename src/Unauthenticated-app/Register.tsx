import { useAuth } from 'context/auth-context';
import React, { FormEventHandler, FormEvent } from 'react';
import { Button, Form, Input } from "antd";
import { LongButton } from 'Unauthenticated-app';
import { useAsync } from 'utils/use-async';
export const RegisterScreeen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register, user } = useAuth(); // 用户名是从这里取出来的.
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        if (cpassword != values.password) {
            return onError(new Error('请确认两次输入的密码相同'))
        }
        const { username, password } = values;
        try {
            // await register({ username, password });
            await run(register({ username, password }))
        } catch (e) {
            onError(e);
        }
    }
    return <Form onFinish={handleSubmit}>
        {/* <Form.Item>
            {user ? `登录成功,用户名${user.name}` : null}
        </Form.Item> */}
        <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入账号' }]}
        >
            <Input
                type="text"
                placeholder='账号:'
                id={'username'}

            />
        </Form.Item>
        <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
        >
            <Input
                type="password"
                id={'password'}
                placeholder='密码'
            />
        </Form.Item>
        <Form.Item
            name='cpassword'
            rules={[{ required: true, message: '请确认密码' }]}
        >
            <Input
                type="password"
                id={'cpassword'}
                placeholder='请确认密码'
            />
        </Form.Item>
        <Form.Item>
            <LongButton
                htmlType='submit'
                type='primary'
                loading={isLoading}
            >注册</LongButton>
        </Form.Item>
    </Form>
}
