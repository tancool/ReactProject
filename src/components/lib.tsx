import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBootom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom:${props => props.marginBootom + 'rem'};
> *{
    margin-top: 0 !important;
    margin-top: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`
// > * 是直接指定子元素

// 展示全局的加载状态
const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
export const FullPageLoading = () => <FullPage>
    <Spin size={'large'}>
    </Spin>
</FullPage>

// 展示全局的错误信息
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => <FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

// 边距为0的按钮
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`


// 类型守卫
const isError = (value: any): value is Error => value?.message

// 合理的代码没有使用到.只是一个演示
export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
    }
    return null
}