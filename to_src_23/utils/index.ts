import { useEffect, useState } from "react";

export const isFalsy = (value: any) => value === 0 ? false : !value;

// 在一个函数里,改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    const result = { ...object }; // 这个是等价于 Object.assign({},object);

    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result;
}
export const useMount = (callback: () => void) => {
    useEffect(() => { callback() }, [])
}
export const useDebounce = <V>(value: V, delay?: number) => {
    // 这个其中的细节需要自信的去理解下
    const [debounceValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            return clearTimeout(timeout)
        }
    }, [value, delay]);
    return debounceValue;
}
