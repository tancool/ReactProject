import React, { useState } from 'react';
import { useCallback } from 'react';

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
