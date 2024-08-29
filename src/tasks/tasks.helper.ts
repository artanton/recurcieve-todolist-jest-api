export interface ITask {
  text: string;
  date: string;
  subLevel: number;
  parentId: string;
}

export const groupTasksByParentId = (tasks: ITask[]) => {
  const taskMap = {};
  tasks.forEach((task: ITask) => {
    if (!taskMap[task.parentId]) {
      taskMap[task.parentId] = [];
    }
    taskMap[task.parentId].push(task);
  });
  return taskMap;
};
