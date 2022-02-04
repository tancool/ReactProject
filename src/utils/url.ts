import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from './index';

/**
 * 返回页面url中,指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 不可以直接读取[.] 参数的.
    // 如果直接读取的话,是会进行报错的.
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () => keys.reduce((prev, key: K) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string }),
            [searchParams] // 如果是state放在这个依赖列表里,就不会像对象那么造成无限循环的问题.
            // 只有在searchParams发生改变的时候,再去进行useMemo运算
        ),

        // sign 是用来测试编辑和新建关闭的时候,后设置的setHook会失效,而进行的一次设置.该问题目前的解决办法是通过重新书写了一个 useSetUrlSearchParam 进行解决.
        (params: Partial<{ [key in K]: unknown }>, sign?: string) => {
            // 对象的键值必须在key中.
            // unknow表示对象值的类型是没有关系的.
            // Object.fromEntries 是Object.enteris的你操作.
            // iteartor是一个遍历器.[],{},Map都是部署了iteartor的.部署了iteartor的都可以使用for of 进行操作的
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}

// ts会认为这种数组,在ts中也可以称为集合.里面的类型都是应该保持一致的.每一个类型都是一样的.为了做到一样.就让他们都有一个共有的类型. => 这个就是TS实现的
// 如果返回最原始的类型,就是使用 as const
//   as const 大多数的时候就是为了解决这个问题的
const a = ['jack', 12, { gender: 'male' }] as const

// 通过这个单独得 hook 来 set search param
// 把输入框的内容映射到url地址上
export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params
        }) as URLSearchParamsInit
        console.log(o);

        return setSearchParams(o)
    }
}