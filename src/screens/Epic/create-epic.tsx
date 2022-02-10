import styled from '@emotion/styled'
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import UserSelect from 'components/user-select'
import React, { useEffect } from 'react'
import { useProjectIdInUrl } from 'screens/kanban/util'
import { useAddEpic } from 'utils/epic'
import { useEpicQueryKey } from './utils'

// 这里的visible没有放到全局进行管理.而是使用的局部进行管理
// 从中间选择两个pick出来
export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
    const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey())
    const [form] = useForm()
    const projectId = useProjectIdInUrl()
    const onFinish = async (values: any) => {
        console.log(values, projectId);
        
        await addEpic({ ...values, projectId })
        props.onClose()
    }
    useEffect(() => {
        form.resetFields()
    }, [form, props.visible])
    return (
        <Drawer
            forceRender={true}
            destroyOnClose={true}
            width={'100%'}
            visible={props.visible}
            onClose={props.onClose}
        >
            <Container>
                {
                    isLoading ? <Spin size={'large'}></Spin> : <>
                        <h1>创建任务组</h1>
                        <ErrorBox error={error}></ErrorBox>
                        <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                            <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入任务组名称' }]}>
                                {/* Input中的事件和name其实被Item代理了 */}
                                <Input placeholder={'请输入项目名称'}></Input>
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button loading={isLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                            </Form.Item>
                        </Form>
                    </>
                }
            </Container>
        </Drawer>
    )
}


const Container = styled.div`
    height:80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`