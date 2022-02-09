import { Kanban } from './../../types/kanban';
import React from 'react';
import { useTasks } from 'utils/task';
import { useTasksSearchParams } from './util';
import { useTaskTypes } from 'utils/task-type';
import TaskIcon from 'assets/task.svg';
import BugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';


// icon图标的渲染
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) return null
    // console.log(taskIcon);
    // console.log(bugIcon);
    console.log(name);

    return <img alt={'task-icon'} src={TaskIcon} />
}
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.id === kanban.id)
    return <Container>
        <h3>{kanban.name}</h3>
        <TasksContainer>
            {tasks?.map(task =>
                <Card style={{ marginBottom: '.5rem' }} key={task.id}>
                    <div>
                        <TaskTypeIcon id={task.typeId} />
                        {task.name}
                    </div>
                </Card>)}
        </TasksContainer>
    </Container>
}

const Container = styled.div`
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