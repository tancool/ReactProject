import { Kanban } from './../../types/kanban';
import React from 'react';
import { useTasks } from 'utils/task';
import { useTasksSearchParams } from './util';
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.id === kanban.id)
    return <div>
        <h3>{kanban.name}</h3>
        {tasks?.map(task =><div key={task.id}>
            {task.name}
        </div>)}
    </div>
}