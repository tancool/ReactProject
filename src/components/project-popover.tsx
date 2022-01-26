import styled from '@emotion/styled';
import { List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from './../utils/project';

export const ProjectPopover = () => {
  const {data:projects,isLoading} = useProjects()
  const pinnedProjects = projects?.filter(project=>project.pin) // 获得所有的收藏项目
  const context = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project=><List.Item>
          <List.Item.Meta title={project.name}/>
        </List.Item>)
      }
    </List>
  </ContentContainer>

  return <Popover placement={'bottom'} content={context}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem;
`