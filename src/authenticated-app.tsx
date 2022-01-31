
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
// import softwareLogo from "./assets/software-logo.svg";
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg' // 这就意味着,这个是一个React组件
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Outlet, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utils';
import { useState } from 'react';
import ProjectModal from './screens/project-list/project-modal';
import { ProjectPopover } from './components/project-popover';
// 这就意味着这个图片是一个组件
export const AuthenticateApp = () => {
    // const [projectModalOpen, setProjectModalOpen] = useState(false)
    return (
        <div>
            {/* 这个代表的是目前的整个登录后的状态 */}
            {/* 如果是直接使用方法名的话,还可以这么写的 */}
            <Container>
                <PageHeader projectButton={
                    <ButtonNoPadding
                        type={'link'}
                        // onClick={() => setProjectModalOpen(true)}
                    >创建项目
                    </ButtonNoPadding>
                } />
                <Main>
                    {/* <ProjectListScreen /> */}
                    <Router>
                        <Routes>
                            {/* Route也是一个组件,可以直接进行传值. */}
                            <Route path={'/projects'} element={<ProjectListScreen
                                // projectButton={
                                //     <ButtonNoPadding
                                //         type={'link'}
                                //         // onClick={() => setProjectModalOpen(true)}
                                //     >创建项目
                                //     </ButtonNoPadding>
                                // } 
                                />} ></ Route>
                            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                            <Route path='*' element={<Navigate to={'/projects'} />} />
                        </Routes >
                    </Router >
                </Main>
                {/* 因为ProjectModal是在哪个层级都可以被打开的,页面层级比较高.所以放在页面层级比较高的上面是比较合适的 */}
                <ProjectModal 
                // projectModalOpen={projectModalOpen} 
                // onClose={() => setProjectModalOpen(false)}
                ></ProjectModal>
            </Container>
        </div>
    )
}
const PageHeader = (props: { projectButton: JSX.Element }) => {
    return (<Header between={true}>
        <HeaderLeft gap={true}>
            {/* <img src={softwareLogo} alt="" /> */}
            <ButtonNoPadding style={{ 'padding': '0' }} type={'link'} onClick={resetRoute}>
                <SoftwareLogo width={'18rem'} color='rgb(38,132,255)' />
            </ButtonNoPadding>
            {/* <h2>项目</h2> */}
            <ProjectPopover  
            // {...props} 
            />
            <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>)
}
const User = () => {
    const { logout, user } = useAuth();
    return <Dropdown overlay={
        <Menu>
            <Menu.Item key={'logout'}>
                <Button onClick={logout}>登出</Button>
            </Menu.Item>
        </Menu>
    }>
        {/* 取消默认事件,防止页面刷新 */}
        <Button onClick={e => e.preventDefault()}>你好 {user?.name || '用户'}</Button>
    </Dropdown>
}

const Container = styled.header`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`;
const Header = styled(Row)`
justify-content: space-between;
padding: 3.2rem;
box-shadow:  0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`;
const Main = styled.main``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.h3`margin-right:3rem`;