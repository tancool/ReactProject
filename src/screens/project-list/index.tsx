import React, { useEffect, useState } from 'react';
import { cleanObject, useDocumentTitle } from 'utils';
import { SearchPanel } from './search-panel'
import { List } from './list';
import { useMount, useDebounce } from './../../utils/index';
import { useHTTP } from 'utils/http';
import styled from '@emotion/styled';
import { Button, Row, Typography } from 'antd';
import { useAsync } from './../../utils/use-async';
import { useProjects } from './../../utils/project';
import { useUsers } from './../../utils/user';
import { useUrlQueryParam } from 'utils/url';
import { useProjectModal, useProjectsSearchParams } from './until';
import { ButtonNoPadding, ScreenContainer } from 'components/lib';
import { Profiler } from 'components/profiler';
const apiUrl = process.env.REACT_APP_API_URL;
/**
 * 这个需要使用Json-Server才能得到数据,这里做个备注.
*/
export const ProjectListScreen = (
    // props:{projectButton:JSX.Element}
) => {
    useDocumentTitle('项目列表', false)
    // param是表单的状态
    // const [param , setParam] = useState({
    //     name: '',
    //     personId: '',
    // })
    // const [keys,setKeys] = useState<('name'|'personId')[]>(['name','personId']); // 这个是假设给useMemo的依赖

    const [param, setParam] = useProjectsSearchParams()
    // const [users, setUsers] = useState([]);
    const debouncedParam = useDebounce(param, 2000); // 当每次数据执行setXXX的时候，这个函数都会被重新赋值,上个函数也就会被更新.
    // TODO 这一块需要了解下  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数.
    const { isLoading, error, data: list } = useProjects(debouncedParam);
    const { data: users } = useUsers()
    const { open } = useProjectModal()
    // useEffect(() => {
    //     // client(['projects', { data: cleanObject(debouncedParam) }]); => http返回函数使用 ... 就可以将touple函数修改为普通参数的形式

    //     run(client('projects', { data: cleanObject(debouncedParam) }))
    //     // .then(data => {
    //     //     setList(data);
    //     // })
    //     //     .catch(error => {
    //     //         setList([]);1
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

    // const [value, setValue] = useState('')
    return <Profiler id={'项目列表'}>
        <ScreenContainer>
            {/* <input type="text" value={value} onChange={evt => setValue(evt.target.value)} /> */}
            <Row justify={'space-between'}>
                <h2>项目列表</h2>
                {/* {props.projectButton} */}
                {/* <Button onClick={() => console.log('我被触发了')}>创建项目</Button> */}
                <ButtonNoPadding
                    type={'link'}
                    onClick={open}
                >
                    创建项目
                </ButtonNoPadding>
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List dataSource={list || []} users={users || []} loading={isLoading}></List>
        </ScreenContainer>
    </Profiler>
}
const Container = styled.div`
padding: 3.2rem;
flex-grow: 1;
`