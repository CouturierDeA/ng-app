import {Todo} from '../domain/todo';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class TodoService {
  // protected baseUrl = 'https://localhost:4000'
  protected baseUrl = 'http://localhost:3000'

  constructor(protected http: HttpClient) {
  }

  getTodoList() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todo`)
  }

  deleteTodo(todoId: number) {
    return this.http.delete<{}>(`${this.baseUrl}/todo/${todoId}`).pipe(
      map(res => todoId)
    )
  }

  updateTodo(todoId: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.baseUrl}/todo/${todoId}`, {
      ...todo,
      id: todoId
    })
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(`${this.baseUrl}/todo`, {
      ...todo,
    })
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
}
