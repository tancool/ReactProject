
import { ProjectListScreen } from './screens/project-list/index';
import { useAuth } from 'context/auth-context';
export const AuthenticateApp = () => {
    const { logout } = useAuth();
    return <div>
        {/* 这个代表的是目前的整个登录后的状态 */}
        {/* 如果是直接使用方法名的话,还可以这么写的 */}
        <button onClick={logout}>登出</button>
        <ProjectListScreen />
    </div>
}