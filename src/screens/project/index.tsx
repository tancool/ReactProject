import React from 'react'
import { Link, Routes } from 'react-router-dom'
import { Route, Navigate } from 'react-router';
import { KanbanScreen } from 'screens/kanban';
import { EpicScreen } from 'screens/epic';
export const ProjectScreen = () => {
    console.log(window.location.pathname);

    return <div>
        {/* <h1>ProjectScreen</h1> */}
        {/* 加上/的话,意思就是根路由 */}
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            <Route path={'kanban'} element={<KanbanScreen />} />
            <Route path={'epic'} element={<EpicScreen />} />
            {/* 如果都没有匹配到,那么就默认跳转到看板.这个是默认路由 */}
            <Route path='*' element={<Navigate to={'kanban'} replace={true} />} />
        </Routes>
    </div>
}