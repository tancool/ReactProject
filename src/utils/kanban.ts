import { useQuery } from "react-query";
import { Project } from "types/project";
import { useHTTP } from "./http";
import { Kanban } from './../types/kanban';

export const uesKanbans = (param?: Partial<Kanban>) => {
    const client = useHTTP()
    return useQuery<Kanban[], Error>(['kanbans', param], () => client('kanbans', { data: param }))
}