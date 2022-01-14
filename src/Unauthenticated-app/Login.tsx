import React, { FormEventHandler, FormEvent } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'Unauthenticated-app';
import { useAsync } from './../utils/use-async';
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth() // 用户名是从这里取出来的.
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })

    const handleSubmit = async (event: { username: string, password: string }) => {
        // name是由Form.item上面的name决定的
        const { username, password } = event;
        try {
            // await login({ username, password });
            await run(login({ username, password }))
        } catch (e) {
            // 这里应该加上async await. 因为login是一个异步的函数
            onError(e);
        }
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
            <LongButton
                htmlType='submit'
                type={'primary'}
                loading={isLoading}
            >登录</LongButton>
        </Form.Item>
    </Form >
}
