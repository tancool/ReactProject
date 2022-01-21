import { Table, TableProps } from "antd"
import Pin from "components/pin"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { User } from "./search-panel"
import { render } from '@testing-library/react';
import { useEditProject } from "utils/project"

// TODO 把所有ID都改为number类型
export interface Project {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number
}
interface ListProps extends TableProps<Project> {
    users: User[]
}
export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject() // 这样就得到了mutate函数

    // const pinProject = (id: number, pin: boolean) => mutate({ id, pin }) // 这样把函数放在外面也是可以的.
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    let num =1
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
}