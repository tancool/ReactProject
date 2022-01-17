import { Table, TableProps } from "antd"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { User } from "./search-panel"

// TODO 把所有ID都改为number类型
export interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created: number
}
interface ListProps extends TableProps<Project> {
    users: User[]
}
export const List = ({ users, ...props }: ListProps) => {
    return <div>
        <Table
            pagination={false}
            rowKey={(record: { [key: string]: any }) => record.personId as number}
            columns={
                [
                    {
                        title: '名称',
                        // dataIndex: 'name',
                        key: 'name',
                        // sorter: (a, b) => a.name.localeCompare(b.name)
                        render(value, project) {
                            console.log(project.id);
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
                        render(value, procect) {
                            return <span key={procect.personId}>
                                {
                                    users.find((user: any) => {
                                        return user.id == procect.personId;
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