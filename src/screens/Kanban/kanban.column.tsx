import { Kanban } from './../../types/kanban';
import React from 'react';
import { useTasks } from 'utils/task';
import { useTasksSearchParams } from './util';
import { useTaskTypes } from 'utils/task-type';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
import { CreateTask } from './create-task';


// icon图标的渲染
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) return null
    return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />
}
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => {
        return task.kanbanId === kanban.id
    })
    console.log('查看相关的数据');
    console.log(tasks);


    return <Container>
        <h2>{kanban.name}</h2>
        <TasksContainer>
            {tasks?.map(task =>
                <Card style={{ marginBottom: '.5rem' }} key={task.id}>
                    <div>
                        {task.name}
                    </div>
                    <TaskTypeIcon id={task.typeId} />
                </Card>)}
            <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
    </Container>
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