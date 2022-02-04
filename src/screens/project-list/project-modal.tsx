import React from 'react';
import { Button, Drawer } from 'antd';
import { useProjectModal } from './until';

export default function ProjectModal(
    // props: { projectModalOpen: boolean, onClose: () => void }
) {
    const { projectModalOpen, close,editingProject,isLoading } = useProjectModal()
    return <Drawer
        // onClose={props.onClose}
        // visible={props.projectModalOpen}
        onClose={close}
        visible={projectModalOpen}
        width={'100%'}>
        <h1>Project Modal</h1>
        <Button
            // onClick={props.onClose}
            onClick={close}
        >关闭</Button>
    </Drawer>;
}
