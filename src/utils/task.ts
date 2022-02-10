import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import { Task } from "types/task";
import { useHTTP } from "./http";
import { useDeleteConfig, useEditConfig } from "./use-optimistic.options";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHTTP()
    return useQuery<Task[], Error>(['tasks', param], () => client('tasks', { data: param }))
}

// 获取Project详情
export const useTask = (id?: number) => {
    const client = useHTTP()
    return useQuery<Project>(
        ['task', { id }],
        () => client(`tasks/${id}`),
        {
            enabled: !!id
        }
    )
}

// 编辑 Task
export const useEditTask = (queryKey: QueryKey) => {
    const client = useHTTP()
    return useMutation(
        (params: Partial<Task>) => client(`tasks/${params.id}`, {
            method: "PATCH",
            data: params
        }),
        useEditConfig(queryKey)
    )
}

// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHTTP()
    return useMutation(
        ({ id }: { id: number }) => client(`tasks/${id}`, {
            method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}