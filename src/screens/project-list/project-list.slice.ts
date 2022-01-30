// slice就是切片的意思.

import { createSlice } from "@reduxjs/toolkit"

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
    openProjectModal(state) { // 这里是用了类似immer的数据结构
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})