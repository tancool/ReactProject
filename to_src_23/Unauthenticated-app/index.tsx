import { useState } from "react";
import { RegisterScreeen } from "./Register"
import { LoginScreen } from "./Login"
export const UnaurhenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    return <div>
        <button onClick={() => { setIsRegister(!isRegister) }}>切换到{isRegister ? '登录' : '注册'}</button>
        {isRegister ? <RegisterScreeen /> : <LoginScreen />}
    </div>
}