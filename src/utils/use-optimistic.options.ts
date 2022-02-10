import { QueryKey, useQueryClient } from "react-query"
import { useProjectsSearchParams } from "screens/project-list/until"
import { Task } from "types/task"
import { reorder } from "./recorder"

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) { // target存储的是当前的数据
            const previousItems = queryClient.getQueriesData(queryKey)
            queryClient.setQueriesData(queryKey, (old?: any) => {
                return callback(target, old)
            })

            return { previousItems }
        },
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueriesData(queryKey, context.previousItems)
        }
    }
}
export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams()
    return ['projects', params]
}
export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? { ...item, ...target } : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old ? [...old, target] : [])
export const useReorderKanbanConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))
export const useReorderTaskConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[]
    return orderedList.map((item: Task) =>
        item.id === target.fromId
            ? { ...item, kanbanId: target.toKanbanId }
            : item)
})