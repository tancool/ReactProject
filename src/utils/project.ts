import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHTTP } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
    // TODO 这一块需要了解下  console.log(debouncedParam); 每次数据更新,都会重新重新执行这个函数.
    const client = useHTTP();
    const { run, ...result } = useAsync<Project[]>();
    useEffect(() => {
        // client(['projects', { data: cleanObject(debouncedParam) }]); => http返回函数使用 ... 就可以将touple函数修改为普通参数的形式

        run(client('projects', { data: cleanObject(param || {}) }))
        // .then(data => {
        //     setList(data);
        // })
        //     .catch(error => {
        //         setList([]);
        //     })
        //     .finally(() => {
        //     });
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json());
        //     }
        // })
    }, [param]);

    return result;
}
