
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
// import softwareLogo from "./assets/software-logo.svg";
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg' // 这就意味着,这个是一个React组件
import { Dropdown, Menu } from 'antd';
// 这就意味着这个图片是一个组件
export const AuthenticateApp = () => {
    const { logout, user } = useAuth();
    return <div>
        {/* 这个代表的是目前的整个登录后的状态 */}
        {/* 如果是直接使用方法名的话,还可以这么写的 */}
        <Containter>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    {/* <img src={softwareLogo} alt="" /> */}
                    <SoftwareLogo width={'20rem'} color='rgb(38,132,255)' />
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                                <a href="#" onClick={logout}>登出</a>
                            </Menu.Item>
                        </Menu>
                    }>
                        {/* 取消默认事件,防止页面刷新 */}
                        <a onClick={e => e.preventDefault()}>你好 {user?.name || '用户'}</a>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Containter>
    </div>
}

const Containter = styled.header`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`;
const Header = styled(Row)`
padding: 3.2rem;
box-shadow:  0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`;
const Main = styled.main``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.h3`margin-right:3rem`;