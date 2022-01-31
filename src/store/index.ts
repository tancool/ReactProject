import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "screens/project-list/project-list.slice"
import { authSlice } from "./auth.slice"

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth:authSlice.reducer
}
export const store = configureStore({
    reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch
// 这是一个类型的设计
// typeof 将 store.getState函数转换为一个ts的类型
// ReturnType 是TS自带的一个类型 : 传入一个函数,会帮我读出函数的返回值
export type RootState = ReturnType<typeof store.getState>