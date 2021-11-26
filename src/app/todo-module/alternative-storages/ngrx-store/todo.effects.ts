import {Injectable} from "@angular/core";
import {TodoService} from "../services/todo.service";
import {Todo} from "../domain/todo";
import {map, switchMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  ACTION_TODO_UPDATE,
  ACTION_TODO_DELETE,
  COMMIT_TODO_LIST,
  COMMIT_TODO_UPDATE,
  COMMIT_TODO_DELETE,
  QUERY_TODO_LIST, ACTION_TODO_ADD, COMMIT_TODO_ADD,
} from "./todo.actions";

@Injectable()
export class TodoEffects {
  constructor(
    private todoService: TodoService,
    private actions$: Actions,
  ) {
  }

  onUpdate = createEffect(() => this.actions$.pipe(
    ofType(ACTION_TODO_UPDATE),
    switchMap((action) => this.todoService.updateTodo(action.todo.id, action.todo).pipe(
      map((updatedTodoResponse: Todo) => {
        return COMMIT_TODO_UPDATE({todo: updatedTodoResponse});
      })
    ))
  ), {dispatch: true})
  onAdd = createEffect(() => this.actions$.pipe(
    ofType(ACTION_TODO_ADD),
    switchMap((action) => this.todoService.addTodo(action.todo).pipe(
      map((newTodoResponse: Todo) => {
        return COMMIT_TODO_ADD({todo: newTodoResponse});
      })
    ))
  ), {dispatch: true})

  onDelete = createEffect(() => this.actions$.pipe(
    ofType(ACTION_TODO_DELETE),
    switchMap((action) => this.todoService.deleteTodo(action.id).pipe(
      map((id) => {
        return COMMIT_TODO_DELETE({id});
      })
    ))
  ), {dispatch: true})

  onGetAll = createEffect(() => this.actions$.pipe(
    ofType(QUERY_TODO_LIST),
    switchMap(() => this.tapGetAll())
  ), {dispatch: true})

  tapGetAll = () => this.todoService.getTodoList().pipe(
    map((data: Todo[]) => {
      return COMMIT_TODO_LIST({todoList: data});
    })
  )
}
