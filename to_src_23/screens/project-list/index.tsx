import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { cleanObject } from 'utils';
import { SearchPanel } from './search-panel'
import { List } from './list';
import { useMount, useDebounce } from '../../utils/index';
import { useHTTP } from 'utils/http';
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
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const debouncedParam = useDebounce(param, 2000); // 当每次数据执行setXXX的时候，这个函数都会被重新赋值,上个函数也就会被更新.
    // TODO 这一块需要了解下  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数.
    const client = useHTTP();
    useEffect(() => {
        // client(['projects', { data: cleanObject(debouncedParam) }]); => http返回函数使用 ... 就可以将touple函数修改为普通参数的形式
        client('projects', { data: cleanObject(debouncedParam) }).then(data => {
            setList(data);
        });
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json());
        //     }
        // })
    }, [debouncedParam]);
    useMount(() => {
        client('users').then(setUsers);
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json());
        //     }
        // })
    }); // 第三个参数是监听
    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}
