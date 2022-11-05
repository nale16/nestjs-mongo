import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from 'src/schemas';
import { CreateTodoDTO } from 'src/dtos';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo')
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getTodos(): Promise<Todo[]> {
    const findTodos = await this.todoModel.find();
    if (!findTodos || findTodos.length == 0) {
      throw new NotFoundException('Todos is empty!');
    }
    return findTodos;
  }

  async getTodo(todoId: string): Promise<Todo> {
    const findTodo = await this.todoModel.findById(todoId).exec();

    if (!findTodo) {
      throw new NotFoundException(`Todo not found.`);
    }

    return findTodo;
  }

  async createTodo(createTodoDto: CreateTodoDTO): Promise<Todo> {
    const addTodo = await this.todoModel.create(createTodoDto);
    return addTodo.save();
  }

  async updateTodo(todoId: string, updateTodo: CreateTodoDTO): Promise<Todo> {
    const existingTodo = await this.todoModel.findByIdAndUpdate(
      todoId,
      updateTodo,
      { new: true },
    );

    if (!existingTodo) {
      throw new NotFoundException(`Todo not found.`);
    }

    return existingTodo;
  }

  async deleteTodo(todoId: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      throw new NotFoundException(`Todo not found.`);
    }
    return deletedTodo;
  }
}
