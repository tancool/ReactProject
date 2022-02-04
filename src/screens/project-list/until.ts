import { useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]),
        setParam
    ] as const
}

// useProjectModal 扮演的就是一个全局状态管理器的功能
// 就可以取代redux / context的作用
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']) // 判断是否是在创建阶段
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']) // 判断是否是在编辑阶段
    const setUrlParams = useSetUrlSearchParam()
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
    const open = () => { setProjectCreate({ projectCreate: true }) }
    const close = () => {
        // 如果设置为false,是会进行自动隐藏的
        setUrlParams({
            editingProjectId: undefined,
            projectCreate: undefined 
        })
        // setEditingProjectId({  },'edit');
        // // setTimeout(() => {
        // setProjectCreate({},'create');
        // // }, 2000)
    }
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}
// 14.47