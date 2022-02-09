import React from 'react'
import { Link, Routes } from 'react-router-dom'
import { Route, Navigate, useLocation } from 'react-router';
import { KanbanScreen } from 'screens/kanban';
import { EpicScreen } from 'screens/epic';
import styled from '@emotion/styled';
import { ScreenContainer } from 'components/lib';
import { Menu } from 'antd';

const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}
export const ProjectScreen = () => {
    const routeType = useRouteType()
    return <Container>
        {/* <h1>ProjectScreen</h1> */}
        {/* 加上/的话,意思就是根路由 */}
        <Aside>
            <Menu mode={'inline'} selectedKeys={[routeType]}>
                <Menu.Item key={'kanban'}>
                    <Link to={'kanban'}>看板</Link>
                </Menu.Item>
                <Menu.Item key={'epic'}>
                    <Link to={'epic'}>任务组</Link>
                </Menu.Item>
            </Menu>
        </Aside>
        <Main>
            <Routes>
                <Route path={'kanban'} element={<KanbanScreen />} />
                <Route path={'epic'} element={<EpicScreen />} />
                {/* 如果都没有匹配到,那么就默认跳转到看板.这个是默认路由 */}
                <Route path='*' element={<Navigate to={'kanban'} replace={true} />} />
            </Routes>
        </Main>
    </Container>
}
const Aside = styled.aside`
background-color: rgb(244,245,247);
display: flex;
`
const Main = styled.div`
display: flex;
box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
overflow: hidden;
`
const Container = styled.div`
display: grid;
grid-template-columns:16rem 1fr;
`