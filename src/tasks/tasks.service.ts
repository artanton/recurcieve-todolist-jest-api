// import { Injectable } from '@nestjs/common';
// import { Body, Param } from '@nestjs/common';
// import { PostTaskDto } from './dto/post-task.dto';

// import { UpdateTaskDto } from './dto/update-task.dto';

// @Injectable()
// export class TasksService {
//   getAllTasks() {
//     return 'get all tasks';
//   }

//   createTask(@Body() postTaskDto: PostTaskDto) {
//     return 'New post created';
//   }

//   updateTask(@Param(':id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
//     return 'Task with id updated';
//   }

//   removeTask(@Param('id') id: string) {
//     return 'delete success';
//   }
// }
import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Task } from './task.entity';
import { PostTaskDto } from './dto/post-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from './task.model';
import groupTasksByParentId from './tasks.helper';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task)
//     private readonly taskRepository: Repository<Task>,
//   ) {}

//   getAllTasks() {
//     return this.taskRepository.find();
//   }

//   createTask(postTaskDto: PostTaskDto) {
//     const task = this.taskRepository.create(postTaskDto);
//     return this.taskRepository.save(task);
//   }

//   updateTask(id: string, updateTaskDto: UpdateTaskDto) {
//     return this.taskRepository.update(id, updateTaskDto);
//   }

//   removeTask(id: string) {
//     return this.taskRepository.delete(id);
//   }
// }

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<ITask>,
  ) {}

  async getAllTasks() {
    const result = await this.taskModel.find();

    return result;
  }

  async createTask(postTaskDto: PostTaskDto) {
    const result = await this.taskModel.create(postTaskDto);

    console.log(result);
    return result;
  }

  async updateTask(filter: { _id: string }, updateTaskDto: UpdateTaskDto) {
    const result = await this.taskModel.findOneAndUpdate(
      filter,
      updateTaskDto,
      { new: true },
    );
    return result;
  }

  async removeTask(id: string) {
    const allTask = await this.taskModel.find();
    const taskMap = groupTasksByParentId(allTask);

    const deleteTaskChain = async (id: string) => {
      if (taskMap[id]) {
        taskMap[id].forEach((subtask) => deleteTaskChain(subtask.id));
      }
      const result = await this.taskModel.findOneAndDelete({ _id: id });
      return result;
    };

    return deleteTaskChain(id);
  }
}
