import styled from '@emotion/styled';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { KanbanColumn } from './kanban.column';
import SearchPanel from './search-panel';
import { useKanbanSearchParams, useProjectInUrl } from './util';
export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans = [] } = useKanbans(useKanbanSearchParams())
    console.log(kanbans);

    return <div>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        <ColunmsContainer>
            {
                kanbans.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>)
            }
        </ColunmsContainer>
    </div>
}

const ColunmsContainer = styled.div`
display:flex;
overflow: hidden;
margin-right: 2rem;

`