import React from 'react';
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from './project-list.slice';

export default function ProjectModal(
    // props: {
    //     projectModalOpen: boolean,
    //     onClose: () => void
    // }
) {
    // useSelector的作用就是用来读取总的状态树[根状态树]
    const projectModalOpen = useSelector(selectProjectModalOpen)
    const dispatch = useDispatch()
    return <Drawer
        onClose={() => dispatch(projectListActions.closeProjectModal())}
        visible={projectModalOpen}
        width={'100%'}
    // <h1>Project Modal</h1>
    >
        <Button
            // onClick={props.onClose}
            onClick={() => dispatch(projectListActions.closeProjectModal())}
        >关闭</Button>
    </Drawer>;
}
