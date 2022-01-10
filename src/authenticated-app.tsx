
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
export const AuthenticateApp = () => {
    const { logout } = useAuth();
    return <div>
        {/* 这个代表的是目前的整个登录后的状态 */}
        {/* 如果是直接使用方法名的话,还可以这么写的 */}
        <Containter>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h2>LOGO</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
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
const Header = styled(Row)``;
const Main = styled.main``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.h3`margin-right:3rem`;