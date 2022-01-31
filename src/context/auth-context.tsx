import React, { useCallback, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel';
import { ReactNode } from 'react';
import { http } from './../utils/http';
import { useMount } from './../utils/index';
import { useAsync } from './../utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import * as authStore from 'store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { bootstrap, selectUser } from 'store/auth.slice';
// 这个只是会写,但是不明白怎么回事.记得重写学习下这个.效果已经实现了.
/**
 * 首先需要明白的是:
 *  - 什么是 React.createContext
 *  - 什么是 AuthContext.Provider
 *  - 什么是 React.useContext
 *  - React的函数为什么可以当作标签
*/
export interface AuthForm {
    username: string,
    password: string,
}

// bootstarp 就是启动 / 初始化的意思
// 根据token去拿到用户信息
export const bootstarpUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user
    }
    return user;
}

// const AuthContext = React.createContext<{ // createContext就是上下文模式
//     user: User | null,
//     login: (form: AuthForm) => Promise<void>
//     register: (form: AuthForm) => Promise<void>,
//     logout: () => Promise<void>
// } | undefined>(undefined);
// AuthContext.displayName = 'AuthContext'; // 这个在项目的实际应用中是没有什么作用的

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 当页面刷新的时候,默认就是null
    // const [user, setUser] = useState<User | null>(null); // 这一行被删除掉了
    const { error, isLoading, isIDle, isError, run } = useAsync<User | null>()
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    useMount(() => { // 这是一个生命周期
        // bootstarpUser().then(setUser);
        run(dispatch(bootstrap()));
    });
    if (isIDle || isLoading) { // 初始的时候,或者加载的时候.
        return <FullPageLoading />
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />
    }
    return <div>{children}</div>// provider就是生产者模式.
}

// 这个一个自定义Hook
export const useAuth = () => {
    // 之前的useAuth的写法
    // const context = React.useContext(AuthContext);
    // if (!context) {
    //     throw new Error(`userAuth必须在AuthProvider中使用`);
    // }
    // return context;
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    return {
        user,
        login,
        register,
        logout
    }
}

// 现在修改的,这一页已经没有任何context的内容了