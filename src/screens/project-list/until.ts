import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

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
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => {
        // 如果设置为false,是会进行自动隐藏的
        setProjectCreate({ projectCreate: false })
    }
    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}