import React from 'react';
import styled from '@emotion/styled';
import { List, Popover, Typography, Divider, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useProjects } from './../utils/project';
import { ButtonNoPadding } from './lib';
import { projectListActions } from 'screens/project-list/project-list.slice';

export const ProjectPopover = (
  // props:{ projectButton: JSX.Element }
) => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin) // 获得所有的收藏项目
  const dispatch = useDispatch()
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
    <ButtonNoPadding
      type={'link'}
      onClick={() => {
        dispatch(projectListActions.openProjectModal())
      }}
    >创建项目</ButtonNoPadding>
    {/* 通过变量渲染标签 */}
    {/* {props.projectButton} */}
  </ContentContainer>

  return <Popover placement={'bottom'} content={context}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem;
`

