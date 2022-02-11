import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ScreenContainer } from 'components/lib';
import { useDocumentTitle } from 'utils';
import { useKanbans, useReorderKanban } from 'utils/kanban';
import { KanbanColumn } from './kanban.column';
import SearchPanel from './search-panel';
import { useKanbanQueryKey, useKanbanSearchParams, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from './util';
import { useReorderTask, useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop';
import { Profiler } from 'components/profiler';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading
    const onDragEnd = useDragEnd()// 这个回调中一般做持久化的工作
    return (
        <Profiler id={'看板'}>
            <DragDropContext onDragEnd={onDragEnd}>
                <ScreenContainer>
                    <h1>{currentProject?.name}看板</h1>
                    <SearchPanel />
                    {isLoading ?
                        <Spin size={'large'}>
                        </Spin>
                        :
                        <ColunmsContainer>
                            <Drop type={'COLUMN'} direction={"horizontal"} droppableId={'kanban'} >
                                <DropChild style={{ display: 'flex' }}>

                                    {
                                        kanbans.map((kanban, index) => <Drag
                                            key={kanban.id}
                                            draggableId={'kanban' + kanban.id}
                                            index={index}
                                        >
                                            <KanbanColumn kanban={kanban} key={kanban.id} />
                                        </Drag>

                                        )
                                    }
                                </DropChild>
                            </Drop>
                            <CreateKanban />
                        </ColunmsContainer>
                    }

                    <TaskModal></TaskModal>
                </ScreenContainer>
            </DragDropContext >
        </Profiler>
    )
}

export const useDragEnd = () => {
    // 先取到看板
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey())
    // 获取task信息
    const { data: allTasks = [] } = useTasks(useTasksSearchParams())
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
    return useCallback(({ source, destination, type }: DropResult) => {
        if (!destination) {
            return
        }
        // 看板排序
        if (type === 'COLUMN') {
            const fromId = kanbans?.[source.index].id
            const toId = kanbans?.[destination.index].id
            // 如果没变化的时候直接return
            if (!fromId || !toId || fromId === toId) {
                return
            }
            // 判断放下的位置在目标的什么方位
            const type = destination.index > source.index ? 'after' : 'before'
            reorderKanban({ fromId, referenceId: toId, type })
        }
        if (type === 'ROW') {
            // 处理task的排序
            // 通过 + 转变为数字
            const fromKanbanId = +source.droppableId
            const toKanbanId = +destination.droppableId
            // 不允许跨版排序
            if (fromKanbanId !== toKanbanId) {
                return
            }
            // 获取拖拽的元素
            const fromTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[source.index]
            const toTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[destination.index]
            //
            if (fromTask?.id === toTask?.id) {
                return
            }
            reorderTask({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                fromKanbanId,
                toKanbanId,
                type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
            })

        }
    }, [allTasks, kanbans, reorderKanban, reorderTask]
    )
}
export const ColunmsContainer = styled('div')`
display:flex;
/* margin-right: 2rem; */
flex:1;
overflow-x:scroll;
`