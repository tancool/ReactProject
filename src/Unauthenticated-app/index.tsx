import { useState } from "react"
import { RegisterScreeen } from "./Register"
import { LoginScreen } from "./Login"
import { Button, Card, Divider, Typography } from "antd"
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useDocumentTitle } from "utils"
export const UnaurhenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    useDocumentTitle('请登录,以继续')
    return <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Header />
        <Background />
        <ShaowCard>
            <Title>{isRegister ? '请注册' : '请登录'}</Title>
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            {isRegister ? <RegisterScreeen onError={setError} /> : <LoginScreen onError={setError} />}
            <Divider />
            <a onClick={() => { setIsRegister(!isRegister) }}>切换到{isRegister ? '已经有账号了?直接登录' : '没有账号?注册新账号'}</a>
        </ShaowCard>
    </Container>
}

// Style后面跟的必须是HTML自带的元素
const Container = styled.div`
display:flex;
flex-direction:column;
align-items: center;
min-height: 100vh;
`;
// 插件可以这么去写
const ShaowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,00.1) 0 0 10px;
text-align: center;
`;
const Header = styled.header`
background:url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`;
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed; // 决定了背景图片是否会随着我们页面的滑动而一起滑动
    background-position: left bottom , right bottom;
    background-size: calc(((100vw - 40rem)/2)-3.2rem),calc(((100vw - 40rem)/2)-3.2rem),cover;
    background-image: url(${left}),url(${right});
`;
const Title = styled.h2`
margin-bottom: 2.4rem;
color:rgb(94,108,132);
`;

export const LongButton = styled(Button)`
width:100%`