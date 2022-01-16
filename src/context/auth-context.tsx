import React, { useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel';
import { ReactNode } from 'react';
import { http } from './../utils/http';
import { useMount } from './../utils/index';
import { useAsync } from './../utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

// 这个只是会写,但是不明白怎么回事.记得重写学习下这个.效果已经实现了.
/**
 * 首先需要明白的是:
 *  - 什么是 React.createContext
 *  - 什么是 AuthContext.Provider
 *  - 什么是 React.useContext
 *  - React的函数为什么可以当作标签
*/
interface AuthForm {
    username: string,
    password: string,
}

// bootstarp 就是启动 / 初始化的意思
// 根据token去拿到用户信息
const bootstarpUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user
    }
    return user;
}

const AuthContext = React.createContext<{ // createContext就是上下文模式
    user: User | null,
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext'; // 这个在项目的实际应用中是没有什么作用的

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 当页面刷新的时候,默认就是null
    // const [user, setUser] = useState<User | null>(null); // 这一行被删除掉了
    const { data: user, error, isLoading, isIDle, isError, run, setData: setUser } = useAsync<User | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser);// 这里是一种简写方式,达到可消参的效果. [这个也是函数式编程中一个非常重要的概念,叫做point free
    const register = (form: AuthForm) => auth.register(form).then(setUser); // 这里是一种简写方式,达到可消参的效果
    const logout = () => auth.logout().then(user => setUser(null));
    useMount(() => { // 这是一个生命周期
        // bootstarpUser().then(setUser);
        run(bootstarpUser());
    });
    if (isIDle || isLoading) { // 初始的时候,或者加载的时候.
        return <FullPageLoading />
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />
    }
    return <AuthContext.Provider value={{ user, login, register, logout }} children={children} /> // provider就是生产者模式.
}

// 这个一个自定义Hook
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error(`userAuth必须在AuthProvider中使用`);
    }
    return context;
}