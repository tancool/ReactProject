import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHTTP } from "./http";

export const useTaskTypes = () => {
    const client = useHTTP()
    return useQuery<TaskType[], Error>(['taskTypes'], () => client('taskTypes'))
}