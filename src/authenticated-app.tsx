
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
export const AuthenticateApp = () => {
    const { logout } = useAuth();
    return <div>
        {/* 这个代表的是目前的整个登录后的状态 */}
        {/* 如果是直接使用方法名的话,还可以这么写的 */}
        <Containter>
            <button onClick={logout}>登出</button>
        </Containter>
        <Main>
            <ProjectListScreen />
        </Main>
    </div>
}
const Containter = styled.header`
    height: 6rem;
    background-color: gray;
`;
const Main = styled.main`
height: calc(100vh - 6rem);
`;