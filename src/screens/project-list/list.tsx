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
    console.log(list);
    return <div>
        <Table
            pagination={false}
            rowKey={(record: { [key: string]: any }) => record.personId as number}
            columns={
                [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name'
                        // sorter: (a, b) => a.name.localeCompare(b.name)
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
            dataSource={list}
        >
        </Table >
    </div>
}