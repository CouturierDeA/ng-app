import {Inject, Injectable, Optional} from "@angular/core";
import {HttpTodoService} from "./http-todo.service";
import {Todo} from "../domain/todo";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MockHttpTodoService extends HttpTodoService {
  constructor(
    @Optional() @Inject('mockTodoList') todoList: Todo[]
  ) {
    super({} as HttpClient);
    this.todoList = todoList || [
      {
        id: 1,
        title: 'Test 1',
        description: 'Test 1 d',
        completed: true
      },
      {
        id: 2,
        title: 'Test 2',
        description: 'Test 2 d',
      }
    ]
  }

  todoList: Todo[];

  getTodoList(title?: string) {
    return of(this.todoList.filter(todoItem => title ? todoItem.title.includes(title) : true))
  }

  updateTodo(todoId: number, todo: Todo) {
    const index = this.todoList.findIndex(v => v.id === todoId)
    this.todoList[index] = todo
    return of(todo)
  }

  addTodo(todo: Todo) {
    this.todoList.push(todo)
    return of(todo)
  }

  deleteTodo(todoId: number) {
    const index = this.todoList.findIndex(v => v.id === todoId)
    this.todoList.splice(index, 1);
    return of(todoId)
  }

  checkUnique(value: string, queryParam: string, entityId?: number): any {
    const result = !this.todoList
      ?.filter(todo => todo.title === value && todo.id !== entityId)
      .length
    return of(result)
  }
}
