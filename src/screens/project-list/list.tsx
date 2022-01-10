import { Table } from "antd"
import React from "react"
import { User } from "./search-panel"

interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string
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
                }
            ]
        }
            dataSource={list}
        >
        </Table >
    </div>
}