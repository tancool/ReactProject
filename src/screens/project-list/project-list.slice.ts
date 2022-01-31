// slice就是切片的意思.

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

// 专门用于管理状态
interface State {
  projectModalOpen: boolean
}
const initialState: State = {
  projectModalOpen: false
}
export const projectListSlice = createSlice({
  name: 'projectModalOpen', // name是一个标识本身
  initialState, // 默认状态
  reducers: {
    openProjectModal(state) { // 这里是用了类似immer的数据结构.只要对象数据变化,内存地址就发生了变化.
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

// 这个和redux的actions概念是一样的.但是类型已经变为一个一个的方法
export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state:RootState) => state.projectList.projectModalOpen