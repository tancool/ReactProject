import { useHTTP } from 'utils/http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { User } from 'types/user';
import { useQuery } from 'react-query';

export const useUsers = (param?: Partial<User>) => {
    const client = useHTTP()
    // 删除原先的 context 方式，改用 url-query 来实现
    // 当 param 变化的时候触发 useQuery 重新渲染，我们需要在第一个参数中传入一个数组，数组的第二位传入依赖
    // 当 param 变化时，会重新发送请求
    // 只用一行代码
    return useQuery<User[]>(['users', param], () => client('users', { data: param }))
    // const client = useHTTP();
    // const { run, ...result } = useAsync<User[]>();

    // useEffect(() => {
    //     run(client('users', { data: cleanObject(param || {}) }));
    // }, [param]);
    // return result;
}