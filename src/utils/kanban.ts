import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import { useHTTP } from "./http";
import { Kanban } from './../types/kanban';
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic.options";
import { Task } from "types/task";
import { useProjectIdInUrl } from "screens/kanban/util";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHTTP()
    return useQuery<Kanban[], Error>(['kanbans', param], () => client('kanbans', { data: param }))
}

export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHTTP()
    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )

}


export const useAddTask = (queryKey: QueryKey) => {
    const client = useHTTP()
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )

}

export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHTTP()
    return useMutation(
        ({ id }: { id: number }) => client(`kanbans/${id}`, {
            method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}
export interface SortProps {
    // 拿的项目的id
    fromId?: number;
    // 放在的位置
    referenceId?: number;
    // 在前面还是在后面
    type: 'before' | 'after';
    fromKanbanId?: number;
    toKanbanId?: number
}

// 持久化数据接口
export const useReorderKanban = (queryKey:QueryKey) => {
    const client = useHTTP()
    return useMutation(
        (params: SortProps) => {
            return client('kanbans/reorder', {
                data: params,
                method: "POST"
            })
        },
        useReorderKanbanConfig(queryKey)
    )
}

// 只获取当前项目的看板
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })