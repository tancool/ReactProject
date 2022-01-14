import { useEffect, useState } from "react";

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
