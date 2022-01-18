import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value;
// 在一个函数里,改变传入的对象本身是不好的行为.不要去改变原对象

export const isVoid = (value: unknown) => value == undefined || value == null || value == ''; // 解决会误删除false的bug
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }; // 这个是等价于 Object.assign({},object);

    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result;
}
export const useMount = (callback: () => void) => {
    useEffect(() => { callback() }, [])
}
export const useDebounce = <V>(value: V, delay?: number) => {
    // 这个其中的细节需要仔细的去理解下
    const [debounceValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            return clearTimeout(timeout)
        }
    }, [value, delay]);
    return debounceValue;
}
/**
 * @param title 标题
 * @param keepOnUnmount 页面卸载的时候,标题是否保留
 */
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {

    // const oldTitle = document.title
    // 页面加载时 oldTitle == 旧的title 'React App'
    // 加载后 oldTitle === 新title

    const oldTitle = useRef(document.title).current // 不使用闭包. useRef就相当于一个容器.并且在生命周期内是不会发生改变的.
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) { // 当不保留的时候,就显示为页面刚加载的标题
                // 如果不指定依赖,读到的就是旧的title
                document.title = oldTitle;
            }
        }
    }, [])
}

// 重置路由并刷新界面 
export const resetRoute = () => window.location.href = window.location.origin;