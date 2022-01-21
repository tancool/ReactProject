/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string
}

interface searchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: searchPanelProps['param']) => void // 指定函数
}

export const SearchPanel = ({ param, setParam, users }: searchPanelProps) => {
    // param是表单的状态
    return <Form layout={'inline'} css={{ marginBottom: '2rem', }}>
        <Form.Item>
            <Input
                type="text"
                value={param.name}
                placeholder='项目名称'
                onChange={
                    // 下面的是等价于 
                    // setParam(Object.assign({},param,{name:evt.target.value}))
                    evt => setParam({
                        ...param,
                        name: evt.target.value
                    })// 这个又是相当于进行重新赋值
                } />
        </Form.Item>
        <Form.Item>
            <Select id=""
            // 这里的value的typeof是字符串.如果匹配不到就会默认显示其value
                value={param.personId}
                onChange={val => setParam({
                    ...param,
                    personId: val
                })}
            >
                <Select.Option value={''}>负责人</Select.Option>
                {users.map((item: any) => {
                    // 这里的nanme是数字.就会发生匹配不上的情况.
                    // 现在的解决办法是暂时将value中的id转换为string
                    return <Select.Option key={item.id} value={String(item.id)}>{item.name}</Select.Option>
                }
                )}
            </Select>
        </Form.Item>
    </Form>
}

