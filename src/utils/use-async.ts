
import { useState } from 'react';

// 这个是泛型的一个基本的使用方式
function getArray<T>(value: T, num = 5): T[] {
    return new Array(num).fill(value);
}
const num = getArray('hello');

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
};

// 默认的State
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

// 用户传入的state
export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState, // 默认的状态
        ...initialState, // 用户传入的State
    });
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null,
    });
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null,
    });
    // run 是用来触发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            // throw error 会打断一切的进程.
            throw new Error('请传入 Promise类型');
        }
        // 如果传入的是一个正常的Promise
        setState({ ...state, stat: 'loading' });
        return promise
            .then(data => { // 如果请求成功的处理方式
                setData(data);
                return data;
            }).catch(error => { // 如果报错的处理方式
                setError(error);
                return error;
            })
    }
    return {
        isIDle: state.stat === 'idle',
        isLoading: state.stat == 'loading',
        isError: state.stat == 'error',
        isSuccess: state.stat == 'success',
        run,
        setData,
        setError,
        ...state
    }
}