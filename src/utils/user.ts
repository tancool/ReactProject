import { User } from "screens/project-list/search-panel";
import { useHTTP } from 'utils/http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';

export const useUsers = (param?: Partial<User>) => {
    const client = useHTTP();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }));
    }, [param]);
    return result;
}