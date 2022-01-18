import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

/**
 * 返回页面url中,指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 不可以直接读取[.] 参数的.
    // 如果直接读取的话,是会进行报错的.
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(() => keys.reduce((prev, key: K) => {
            return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
            [searchParams] // 如果是state放在这个依赖列表里,就不会像对象那么造成无限循环的问题.
            // 只有在searchParams发生改变的时候,再去进行useMemo运算
        ),
        setSearchParam
    ] as const
}

// ts会认为这种数组,在ts中也可以称为集合.里面的类型都是应该保持一致的.每一个类型都是一样的.为了做到一样.就让他们都有一个共有的类型. => 这个就是TS实现的
// 如果返回最原始的类型,就是使用 as const
//   as const 大多数的时候就是为了解决这个问题的
const a = ['jack', 12, { gender: 'male' }] as const