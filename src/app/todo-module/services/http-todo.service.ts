import {Todo} from '../domain/todo';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, map} from "rxjs/operators";

/**
 * Http interaction logic
 */
@Injectable()
export class HttpTodoService {
  protected baseUrl = 'http://localhost:3000'

  constructor(protected http: HttpClient) {
  }

  deleteTodo(todoId: number) {
    return this.http.delete<{}>(`${this.baseUrl}/todo/${todoId}`).pipe(
      map(_ => todoId)
    )
  }

  updateTodo(todoId: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.baseUrl}/todo/${todoId}`, {
      ...todo,
      id: todoId
    })
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(`${this.baseUrl}/todo`, todo)
  }

  checkUnique(value: string, queryParam: string, entityId?: number) {
    return this.http.get<Todo[]>(`${this.baseUrl}/todo`, {
      params: {
        [queryParam!]: value!,
      }
    }).pipe(
      map((todoList) => todoList?.every(todo => !todo || todo.id === entityId))
    )
  }

  getTodoList(title?: string) {
    return this.http.get<Todo[]>(`${this.baseUrl}/todo`, {
      params: title ? {
        title
      } : {}
    }).pipe(
      delay(150), // delay is only for demo purposes of an app-loading component
    )
  }
}
