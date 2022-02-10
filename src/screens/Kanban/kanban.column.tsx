import { Kanban } from './../../types/kanban';
import React from 'react';
import { useTasks } from 'utils/task';
import { useKanbanQueryKey, useKanbanSearchParams, useTaskModal, useTasksSearchParams } from './util';
import { useTaskTypes } from 'utils/task-type';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/lib';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';


// icon图标的渲染
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) return null
    return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTaskModal()
    const { name: keyword } = useTasksSearchParams()
    return <Card
        style={{ marginBottom: '.5rem', cursor: 'pointer' }}
        key={task.id}
        onClick={() => startEdit(task.id)}
    >
        {/* <div>{task.name}</div> */}
        <div>
            <Mark keyword={keyword} name={task.name} />
        </div>
        <TaskTypeIcon id={task.typeId} />
    </Card>
}
// 渲染了三个column，三个请求，整合成一个
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
    // 获取全部的任务数据，在这里获取数据，这个数据是动态的，根据url内容而定
    const { data: allTasks } = useTasks(useTasksSearchParams())
    // 对数据进行分类，返回的是三段数据，都是数组
    // 通过typeId来判断是什么类型
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    
    return <Container ref={ref} {...props} >
        <Row between={true}>
            <h3>{kanban.name} </h3>
            <More kanban={kanban} key={kanban.id} />
        </Row>

        <TasksContainer>
            {/* 用drop包裹父元素，用 drag 来包裹要被拖拽的元素 */}
            <Drop type={"ROW"} direction={"vertical"} droppableId={String(kanban.id)}>
                {/* 没有高度撑不起来了 */}
                <DropChild style={{minHeight:'5px'}}>
                    {
                        tasks?.map((task, taskIndex) =>
                            <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id} >
                                <div>
                                    <TaskCard key={task.id} task={task} />
                                </div>
                            </Drag>)
                    }
                </DropChild>
            </Drop>
            <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
})

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbanQueryKey())
    const startEdit = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({ id: kanban.id })
            }
        })
    }
    const overlay = <Menu>
        <Menu.Item>
            <Button type={'link'} onClick={startEdit}>删除</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overlay}>
        <Button type={'link'}>...</Button>
    </Dropdown>
}
export const Container = styled.div`
min-width: 27rem;
border-radius: 6px;
background-color:rgb(244,245,247);
display: flex;
flex-direction: column;
padding: .7rem .7rem 1rem;
margin-right: 1.5rem;
`
const TasksContainer = styled.div`
overflow: scroll;
flex: 1;
::-webkit-scrollbar{
    display: none;
}
`