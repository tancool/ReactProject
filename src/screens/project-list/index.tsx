import React, { useEffect, useState } from 'react';
import { cleanObject } from 'utils';
import { SearchPanel } from './search-panel'
import { List, Project } from './list';
import { useMount, useDebounce } from './../../utils/index';
import { useHTTP } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useAsync } from './../../utils/use-async';
import { useProjects } from './../../utils/project';
import { useUsers } from './../../utils/user';
const apiUrl = process.env.REACT_APP_API_URL;
/**
 * 这个需要使用Json-Server才能得到数据,这里做个备注.
*/
export const ProjectListScreen = () => {
    // param是表单的状态
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });
    // const [users, setUsers] = useState([]);
    const debouncedParam = useDebounce(param, 2000); // 当每次数据执行setXXX的时候，这个函数都会被重新赋值,上个函数也就会被更新.
    // TODO 这一块需要了解下  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数.
    const { isLoading, error, data: list } = useProjects(debouncedParam);
    const { data: users } = useUsers()
    // useEffect(() => {
    //     // client(['projects', { data: cleanObject(debouncedParam) }]); => http返回函数使用 ... 就可以将touple函数修改为普通参数的形式

    //     run(client('projects', { data: cleanObject(debouncedParam) }))
    //     // .then(data => {
    //     //     setList(data);
    //     // })
    //     //     .catch(error => {
    //     //         setList([]);
    //     //     })
    //     //     .finally(() => {
    //     //     });
    //     // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
    //     //     if (response.ok) {
    //     //         setList(await response.json());
    //     //     }
    //     // })
    // }, [debouncedParam]);
    // const client = useHTTP();
    // useMount(() => {
    //     client('users').then(setUsers);
    //     // fetch(`${apiUrl}/users`).then(async response => {
    //     //     if (response.ok) {
    //     //         setUsers(await response.json());
    //     //     }
    //     // })
    // }); // 第三个参数是监听
    return <Container>
        <h2>项目列表</h2>
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List dataSource={list || []} users={users||[]} loading={isLoading}></List>
    </Container>
}
const Container = styled.div`
padding: 3.2rem;
`