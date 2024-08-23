import { ITask } from './task.model';

const groupTasksByParentId = (tasks: ITask[]) => {
  const taskMap = {};
  tasks.forEach((task: ITask) => {
    if (!taskMap[task.parentId]) {
      taskMap[task.parentId] = [];
    }
    taskMap[task.parentId].push(task);
  });
  return taskMap;
};

export default groupTasksByParentId;
