/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Form, Input, Select } from 'antd';
import UserSelect from "components/user-select";
import React, { useEffect, useState } from 'react';
import { Project } from "types/project";
import { User } from "types/user";
interface searchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>
    // param: {
    //     name: string,
    //     personId: string
    // },
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
            <UserSelect id=""
                // 这里的value的typeof是字符串.如果匹配不到就会默认显示其value
                value={param.personId}
                defaultOptionName = { '负责人'}
                onChange={val => setParam({
                    ...param,
                    personId: val
                })}
            >
                <Select.Option value={''}>负责人</Select.Option>
                {users.map((item: any) => {
                    // 这里的nanme是数字.就会发生匹配不上的情况.
                    // 现在的解决办法是暂时将value中的id转换为string
                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                }
                )}
            </UserSelect>
        </Form.Item>
    </Form>
}

