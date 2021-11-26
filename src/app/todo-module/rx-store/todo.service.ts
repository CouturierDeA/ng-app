import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';

import {TodoService} from "../services/todo.service";
import {Todo} from "../domain/todo";
import {RxTodoStore} from "./todo.store";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class RxTodoService {
  constructor(
    private todoService: TodoService,
    private todoStore: RxTodoStore
  ) {
  }

  readTodoList() {
    return this.todoService.getTodoList().pipe(
      tap(todoList => {
        this.todoStore.updateEntities(todoList)
      })
    )
  }

  addTodo(todo: Todo) {
    return this.todoService.addTodo(todo).pipe(
      tap(newTodo => this.todoStore.addEntity(newTodo))
    )
  }

  deleteTodo(todoId: number) {
    return this.todoService.deleteTodo(todoId).pipe(
      tap(result => this.todoStore.deleteEntity(result))
    )
  }

  updateTodo(todoId: number, todo: Todo) {
    return this.todoService.updateTodo(todoId, todo).pipe(
      tap(updatedTodo => this.todoStore.updateEntity(updatedTodo))
    )
  }
}
