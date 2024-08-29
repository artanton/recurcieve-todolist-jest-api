import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { PostTaskDto } from './dto/post-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongodb';
import { groupTasksByParentId, ITask } from './tasks.helper';
interface ISubTask extends ITask {
  _id: string;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks() {
    const result = await this.taskRepository.find();
    return result;
  }

  async createTask(@Body() postTaskDto: PostTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(postTaskDto);
    const result = await this.taskRepository.save(newTask);
    return result;
  }

  async updateTask(
    @Param(':id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const objectId = new ObjectId(id);
    const editedTask = await this.taskRepository.update(
      { _id: objectId },
      updateTaskDto,
    );
    if (editedTask.affected === 0) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.taskRepository.findOneBy({ _id: objectId });
    return updatedTask;
  }

  async removeTask(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const tasksToDel = [];

    const allTasks = await this.taskRepository.find();
    const taskMap = groupTasksByParentId(allTasks);

    const deleteTaskChain = (id: string) => {
      if (taskMap[id]) {
        taskMap[id].forEach((subtask: ISubTask) => {
          deleteTaskChain(subtask._id);
        });
      }
      tasksToDel.push(new ObjectId(id));
    };
    deleteTaskChain(id);

    const result = await this.taskRepository.delete(tasksToDel);

    if (!result.raw[0].deletedCount) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }
}
