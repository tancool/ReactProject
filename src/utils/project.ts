import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHTTP } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
    // TODO 这一块需要了解下  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数.
    const client = useHTTP()


    // 之前的版本
    // const fetchProjects = useCallback(() => (client('projects', { data: cleanObject(param || {}) })), [param,client])
    // const { run, ...result } = useAsync<Project[]>()
    // useEffect(() => {
    //     // client(['projects', { data: cleanObject(debouncedParam) }]); => http返回函数使用 ... 就可以将touple函数修改为普通参数的形式

    //     run(fetchProjects(), { retry: fetchProjects })
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
    // }, [param, run, fetchProjects]);

    // return result;


    // 使用useQuery获得数据.param改变的时候,就会进行重新触发
    return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }))

}

export const useEditProject = () => {
    const client = useHTTP()
    // const { run, ...asyncResult } = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //     return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }

    // 这个是React-query的hook
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        {
            // 成功时的回调函数
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )
}

export const useAddProject = () => {
    const client = useHTTP()
    // const { run, ...asyncResult } = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //     return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }

    // 使用React-query
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }),
        {
            // 成功时的回调函数
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
    )

}