import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
    // 未来所有的App级别的Providers都会在这里面添加
    // return <AuthProvider children={children} /> // 这种写法是同样的方式

    // 这样相对来说,是比较容易阅读的.
    return <AuthProvider> 
        {children}
    </AuthProvider>

}