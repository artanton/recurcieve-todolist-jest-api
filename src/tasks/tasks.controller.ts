import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { PostTaskDto } from './dto/post-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() postTaskDto: PostTaskDto) {
    return this.taskService.createTask(postTaskDto);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}
