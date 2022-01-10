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
    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={
                // 下面的是等价于 
                // setParam(Object.assign({},param,{name:evt.target.value}))
                evt => setParam({
                    ...param,
                    name: evt.target.value
                })// 这个又是相当于进行重新赋值
            } />
            <select name="" id=""
                value={param.personId}
                onChange={evt => setParam({
                    ...param,
                    personId: evt.target.value
                })}
            >
                <option value={''}>负责人</option>
                {users.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
        </div>
    </form>
}