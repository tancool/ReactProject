import React from 'react';
import styled from '@emotion/styled';
import { ScreenContainer } from 'components/lib';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { KanbanColumn } from './kanban.column';
import SearchPanel from './search-panel';
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util';
import { useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading

    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ?
            <Spin size={'large'}>
            </Spin>
            :
            <ColunmsContainer>
                {
                    kanbans.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>)
                }
                <CreateKanban />
            </ColunmsContainer>
        }

        <TaskModal></TaskModal>
    </ScreenContainer>
}

export const ColunmsContainer = styled.div`
display:flex;
margin-right: 2rem;
flex:1;
overflow-x:scroll;
`