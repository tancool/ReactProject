import styled from '@emotion/styled';
import { List, Popover, Typography, Divider, Button } from 'antd';
import React from 'react';
import { useProjectModal } from 'screens/project-list/until';
import { useProjects } from './../utils/project';
import { ButtonNoPadding } from './lib';

export const ProjectPopover = (
  // props:{ projectButton: JSX.Element }
) => {
  const { data: projects, refetch } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin) // 获得所有的收藏项目
  const { open } = useProjectModal()
  const context = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    {/* <ButtonNoPadding type={'link'}>创建项目</ButtonNoPadding> */}
    {/* {props.projectButton} */}
    <ButtonNoPadding
      onClick={open}
      type={'link'}
    >
      创建项目
    </ButtonNoPadding>
  </ContentContainer>

  return <Popover
    placement={'bottom'}
    content={context}
    onVisibleChange={() => refetch()}
  >
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem;
`