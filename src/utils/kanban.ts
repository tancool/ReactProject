import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import { useHTTP } from "./http";
import { Kanban } from './../types/kanban';
import { useAddConfig } from "./use-optimistic.options";
import { Task } from "types/task";

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