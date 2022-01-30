
import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';

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
const defaultConfig = {
    throwOnError: false,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef])
}

// 用户传入的state
export const useAsync = <D>(initialState?: State<D>, initConfig?: typeof defaultConfig) => { // 第二个参数类型的知识点要学习下. course32
    const config = { ...defaultConfig, ...initConfig }
    // const [state, setState] = useState<State<D>>({
    //     ...defaultInitialState, // 默认的状态
    //     ...initialState, // 用户传入的State
    // });
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState
        })
    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback(
        (data: D) => safeDispatch({
            data,
            stat: 'success',
            error: null,
        }), [safeDispatch]
    )
    const setError = useCallback(
        (error: Error) => safeDispatch({
            error,
            stat: 'error',
            data: null,
        }), [safeDispatch]
    )
    const [retry, setRetry] = useState(() => () => {
        console.log('我已经被执行了');
    })
    // run 是用来触发异步请求
    // useCallback中的第二个参数规定了,只有第二个参数发生变化了.run才会被重新定义
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                // throw error 会打断一切的进程.
                throw new Error('请传入 Promise类型');
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig.retry(), runConfig)
                }
            })
            // 如果传入的是一个正常的Promise
            // setState({ ...state, stat: 'loading' });
            dispatch({ stat: 'loading' });
            return promise
                .then(data => { // 如果请求成功的处理方式
                    // mountedRef.current表示组件已经被挂载,而且此刻不是已经被卸载的状态.
                    // 这个时候,才会进行设置相关的数据
                    safeDispatch(data);
                    return data;
                }).catch(error => { // 如果报错的处理方式
                    // Carch会消化异常,如果不主动抛出.外面是接受不到的
                    setError(error);
                    console.log(config);
                    if (config.throwOnError) return Promise.reject(error)
                    return error
                })
        }, [config.throwOnError, setError, setData,safeDispatch]
    )
    return {
        isIDle: state.stat === 'idle',
        isLoading: state.stat == 'loading',
        isError: state.stat == 'error',
        isSuccess: state.stat == 'success',
        run,
        setData,
        setError,
        retry, // retry被调用时,重新跑一遍run.使得state刷新一遍
        ...state
    }
}