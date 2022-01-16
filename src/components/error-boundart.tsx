import React, { ReactNode } from 'react'


// 因为错误边界的实现,一定要使用class-componse来实现.
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
    // 点开React中,两个TS泛型定义P代表的是Props,S代表的是State.
    state = { error: null };

    // 当子组件抛出异常的时候,这里会将接收到并调用
    static getDerivedStateFromError(error: Error) {
        return { error }
    }
    render(){
        const {error} = this.state
        const {fallbackRender,children} = this.props
        // 这样实现了之后,都会以全局的方式,把错误展现出来.
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}