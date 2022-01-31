import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";
import * as auth from 'auth-provider'
import { AuthForm, bootstarpUser } from "context/auth-context";
import { AppDispatch, RootState } from "store";

interface State {
    user: User | null
}
const initialState: State = {
    user: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

const { setUser } = authSlice.actions

export const selectUser = (state:RootState) => state.auth.user

// 异步的thunk是两层函数
export const login = (form: AuthForm) => (dispatch: AppDispatch) => auth.login(form).then(user => dispatch(setUser(user)))
export const register = (form: AuthForm) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)))
export const bootstrap = () => (dispatch: AppDispatch) => bootstarpUser().then(user => dispatch(setUser(user))) // 根据token拿到用户信息