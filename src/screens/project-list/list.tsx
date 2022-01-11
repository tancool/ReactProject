import { Table } from "antd"
import dayjs from "dayjs"
import React from "react"
import { User } from "./search-panel"

interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created: number
}
interface ListProps {
    list: Project[],
    users: User[]

}
export const List = ({ list, users }: ListProps) => {
    return <div>
        <Table pagination={false} columns={
            [
                {
                    title: '名称',
                    dataIndex: 'name',
                    // sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: "部门",
                    dataIndex: 'organization'
                }, {
                    title: '负责人',
                    dataIndex: 'name1',
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
                    render(value, project) {
                        return <span>
                            {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
                        </span>
                    }
                }
            ]
        }
            dataSource={list}
        >
        </Table >
    </div>
}