import { Dropdown, Menu, Modal, Table, TableProps } from "antd"
import Pin from "components/pin"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { render } from '@testing-library/react';
import { useDeleteProject, useEditProject } from "utils/project"
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from "./until"
import { useDeleteConfig, useProjectsQueryKey } from "utils/use-optimistic.options"
import { Project } from "types/project"
import { User } from "types/user"

// TODO 把所有ID都改为number类型
// export interface Project {
//     id: number,
//     name: string,
//     personId: number,
//     pin: boolean,
//     organization: string,
//     created: number
// }
interface ListProps extends TableProps<Project> {
    users: User[],
    refresh?: () => void
}
export const List = React.memo(({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject(useProjectsQueryKey()) // 这样就得到了mutate函数
    const { startEdit } = useProjectModal()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    const editProject = (id: number) => () => startEdit(id)
    // const pinProject = (id: number, pin: boolean) => mutate({ id, pin }) // 这样把函数放在外面也是可以的.
    // const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh) // props.refresh就是一个函数.这样写的话,就是直接调用这个函数.
    let num = 1
    // console.log('这里被重新渲染了');

    return <div>
        <Table
            pagination={false}
            rowKey={(record: { [key: string]: any }) => num++}
            columns={
                [
                    {
                        title: <Pin checked={true} disabled={true} />,
                        render(value, project) {
                            return <Pin
                                checked={project.pin}
                                // onCheckedChange={pin => {
                                //     mutate({ id: project.id, pin })
                                // }}
                                // onCheckedChange={pin => pinProject(project.id, pin)}
                                onCheckedChange={pinProject(project.id)}
                            />
                        }
                    },
                    {
                        title: '名称',
                        // dataIndex: 'name',
                        key: 'name',
                        // sorter: (a, b) => a.name.localeCompare(b.name)
                        render(value, project) {
                            return <Link to={String(project.id)}>{project.name}</Link>
                        }
                    },
                    {
                        title: "部门",
                        dataIndex: 'organization',
                        key: 'organization'
                    }, {
                        title: '负责人',
                        dataIndex: 'name',
                        key: 'name',
                        render(value, project) {
                            return <span key={project.personId}>
                                {
                                    users.find((user: any) => {
                                        return user.id == project.personId;
                                    })?.name || '未知'
                                }
                            </span>
                        }
                    }, {
                        title: "创建时间",
                        dataIndex: "createdAt",
                        key: 'createdAt',
                        render(value, project) {
                            return <span>
                                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                            </span>
                        }
                    },
                    {
                        render(value, project) {
                            return <More project={project} />
                        }
                    }
                ]
            }
            // dataSource={list}
            {
            ...props
            }
        >
        </Table >
    </div>
})


const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal()
    const editProject = (id: number) => () => startEdit(id)
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => (
        Modal.confirm({
            title: '确定删除这个项目吗',
            content: 'Are you sure you want to delete this project?',
            okText: '确定',
            onOk() {
                deleteProject({ id })
            }
        })
    )
    return <Dropdown overlay={
        <Menu>
            <Menu.Item key={'edit'}>
                <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>编辑</ButtonNoPadding>
            </Menu.Item>
            <Menu.Item key={'delete'}>
                <ButtonNoPadding type={'link'} onClick={() => confirmDeleteProject(project.id)}>删除</ButtonNoPadding>

            </Menu.Item>
        </Menu>
    }>
        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
}