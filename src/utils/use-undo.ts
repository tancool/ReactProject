import React, { useState, useCallback, useReducer } from 'react';

// 以下是自己实现的redo
/*
export const useUndo = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])// past是一个数组,用来记录历史操作记录的合集.
    // const [present, setPresent] = useState(initialPresent) //当前值

    // const [future, setFuture] = useState<T[]>([]) // future保存的已撤回的操作

    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    })


    const canRedu = state.future.length !== 0 //可以往前进行操作
    const canUndo = state.past.length !== 0  // 判断是否存在历史记录.往后进行操作
    const undo = useCallback(() => {  // 撤回操作到上一步.并保存相关记录

        // 这样写的好处就是没有用到外面任何的依赖
        setState(currentState => {
            // if (!canRedu) return;
            // const previous = state.past[state.past.length - 1]
            // const newPast = state.past.slice(0, state.past.length - 1) // slice有一个复制的动作
            // setPast(newPast)
            // setPresent(previous)
            // setFuture([previous, ...future])
            const { past, present, future } = currentState
            if (past.length === 0) return currentState
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        })

    }, [])

    const redo = useCallback(() => { // 取消操作到上一步.并保存相关记录
        // if (!canRedu) return
        // const next = future[0]
        // const newFuture = future.slice(1)
        // setPast([...past, present])
        // setPresent(next)
        // setFuture(newFuture)
        setState(currentState => {
            const { past, present, future } = currentState
            if (future.length === 0) return currentState;
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }

        })
    }, [])
    const set = useCallback((newPresent: T) => {
        // if (newPresent == present) return  // 如果新的值和现在的值是一样的
        // setPast([...past, present])
        // setPresent(newPresent) // 取代现有的值
        // setFuture([])
        setState(currentState => {
            const { past, present, future } = currentState
            if (newPresent == present) return currentState
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })
    }, [])
    const reset = useCallback((newPresent: T) => { // 重置
        // setPast([])
        // setPresent(newPresent)
        // setFuture([])
        setState(currentState => {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
    }, [])

    return [
        state,
        { set, reset, undo, redo, canUndo, canRedu }
    ] as const
}
*/

// 使用reducer来实现相关的功能 [use-reducer版本的相关逻辑]
// 这个就可以看作是轻量版的redux.可以称为一个局部的状态管理.但是不能称作全局状态管理.因为状态不能在组件间共享.
const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'
type State<T> = {
    past: T[],
    present: T,
    future: T[]
}
type Action<T> = {
    newPresent?: T, // newPresent是作为数据的一个参数
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state
    const { type, newPresent } = action
    switch (type) {
        case UNDO: {
            const { past, present, future } = state
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        }
        case REDO:
            {
                if (future.length === 0) return state;
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            }
        case SET:
            {
                if (newPresent == present) return state
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
            }
        case RESET:
            {
                return {
                    past: [],
                    present: newPresent,
                    future: []
                }
            }
    }
}
export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: []
    } as State<T>)

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0
    const undo = useCallback(() => dispatch({ type: UNDO }), [])
    const redo = useCallback(() => dispatch({ type: REDO }), [])
    const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), [])
    const reset = useCallback(() => (newPresent: T) => dispatch({ type: RESET, newPresent }), [])

    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const


}