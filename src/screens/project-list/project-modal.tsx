import React, { useEffect } from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { useProjectModal } from './until';
import { Spin } from 'antd';
import UserSelect from 'components/user-select';
import { useAddProject, useEditProject } from 'utils/project';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';
import { useProjectsQueryKey } from 'utils/use-optimistic.options';

// 整个创建加编辑的Modal
export default function ProjectModal(
    // props: { projectModalOpen: boolean, onClose: () => void }
) {
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
    // 判断是否是编辑状态.
    const useMutateProjet = editingProject ? useEditProject : useAddProject // 不论最后怎么得到的,依然是一个hook,所以这里依然用hook去命名 '

    const [form] = useForm()
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProjet(useProjectsQueryKey())
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields()
            close()
        })
    }

    const closeModal = () => {
        form.resetFields()
        close()
    }

    const title = editingProject ? '编辑项目' : '创建项目'

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])
    return <Drawer
        // onClose={props.onClose}
        // visible={props.projectModalOpen}
        onClose={closeModal}
        visible={projectModalOpen}
        width={'100%'}
        forceRender={true}
    >
        <Container>
            {
                isLoading ? <Spin size={'large'}></Spin> : <>
                    <h1>{title}</h1>
                    <ErrorBox error={error}></ErrorBox>
                    <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                        <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名称' }]}>
                            {/* Input中的事件和name其实被Item代理了 */}
                            <Input placeholder={'请输入项目名称'}></Input>
                        </Form.Item>
                        <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名称' }]}>
                            <Input placeholder={'请输入部门名称'}></Input>
                        </Form.Item>
                        <Form.Item label={'负责人'} name={'personId'}>
                            <UserSelect defaultOptionName={'负责人'}></UserSelect>
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                        </Form.Item>
                    </Form>
                </>
            }
        </Container>
        {/* <h1>Project Modal</h1>
        <Button
            // onClick={props.onClose}
            onClick={close}
        >关闭</Button> */}
    </Drawer>;
}


const Container = styled.div`
    height:80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`