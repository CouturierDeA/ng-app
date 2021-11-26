import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {TodoStore} from './todo.store';
import {TodoService} from "../services/todo.service";
import {Todo} from "../domain/todo";

@Injectable()
export class AkitaTodoService {
  constructor(private todoService: TodoService, private store: TodoStore) {
  }

  updateTodoList(todoList: Todo[]){
    this.store.setTodoList(todoList, true);
  }

  readTodoList(): Observable<Todo[]> {
    return this.todoService.getTodoList().pipe(
      tap(todoList => {
        this.store.setTodoList(todoList, true);
      })
    );
  }

  addTodo(todo: Todo) {
    return this.todoService.addTodo(todo).pipe(
      tap(value => {
        this.store.add([value]);
      })
    );
  }

  deleteTodo(todoId: number) {
    return this.todoService.deleteTodo(todoId).pipe(
      tap(result => {
        this.store.remove(todoId);
      })
    );
  }

  updateTodo(todoId: number, todo: Todo): Observable<Todo> {
    return this.todoService.updateTodo(todoId, todo).pipe(
      tap(result => {
        this.store.update(todoId, result);
      })
    );
  }

  updateSearch(search: string) {
    this.store.updateSearch(search)
  }
}
