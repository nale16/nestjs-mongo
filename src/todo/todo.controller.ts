import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateTodoDTO } from 'src/dtos';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/getTodos')
  async getTodos(@Res() response) {
    try {
      const todos = await this.todoService.getTodos();

      return response.status(HttpStatus.OK).json({
        status: 200,
        message: 'Todos found.',
        data: todos,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/getTodo/:todoId')
  async getTodo(@Res() response, @Param('todoId') todoId: string) {
    try {
      const findTodo = await this.todoService.getTodo(todoId);

      return response.status(HttpStatus.OK).json({
        status: 200,
        message: 'Todo found.',
        data: findTodo,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Post('/createTodo')
  async createTodo(@Res() response, @Body() createTodoDto: CreateTodoDTO) {
    try {
      const addTodo = await this.todoService.createTodo(createTodoDto);

      return response.status(HttpStatus.CREATED).json({
        status: 201,
        message: 'Todo has been created.',
        data: addTodo,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put('/updateTodo/:todoId')
  async updateTodo(
    @Res() response,
    @Param('todoId') todoId: string,
    @Body() updateTodo: CreateTodoDTO,
  ) {
    try {
      const existingTodo = await this.todoService.updateTodo(
        todoId,
        updateTodo,
      );
      return response.status(HttpStatus.OK).json({
        status: 200,
        message: 'Todo has been updated.',
        data: existingTodo,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/deleteTodo/:todoId')
  async deleteTodo(@Res() response, @Param('todoId') todoId: string) {
    try {
      const deleteTodo = await this.todoService.deleteTodo(todoId);

      return response.status(HttpStatus.OK).json({
        status: 200,
        message: 'Todo has been deleted.',
        data: deleteTodo,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
