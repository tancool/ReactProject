import { useQuery } from "react-query";
import { Project } from "types/project";
import { Task } from "types/task";
import { useHTTP } from "./http";

export const useTasks = (param?: Partial<Task>) => {
    const client = useHTTP()
    return useQuery<Task[], Error>(['tasks', param], () => client('tasks', { data: param }))
}