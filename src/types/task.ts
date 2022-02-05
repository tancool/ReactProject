export interface Task {
    id: number;
    name: string;
    processorId: number; // 经办人
    projectId: number; // 项目ID
    epicId: number; // 任务组
    kanbanId: number;
    typeId: number; // bug or task
    note: string;
}