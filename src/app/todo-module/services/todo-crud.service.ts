import {Injectable} from '@angular/core';
import {combineLatest, filter, map, shareReplay, switchMap, tap} from 'rxjs';

import {HttpTodoService} from "./http-todo.service";
import {Todo} from "../domain/todo";
import {NotificationService} from "../../common/ui-lib/notification-module/services/notification.service";
import {UiEffectsService} from "../../common/services/ui-effects/ui-effects.service";
import {TodoModalsService} from "./todo-modals.service";
import {BehaviorSubject} from "rxjs";

/**
 * All Logic of this module goes here
 */
@Injectable()
export class TodoCrudService {
  constructor(
    private modalsService: TodoModalsService,
    private todoService: HttpTodoService,
    private ns: NotificationService,
    public ues: UiEffectsService,
  ) {
  }

  searchByTitle$ = new BehaviorSubject('')
  todoList$ = new BehaviorSubject<Todo[]>([])
  private searchParams$ = combineLatest([this.searchByTitle$])

  searchList$ = this.searchParams$.pipe(
    switchMap(([titleSearch]) => this.getTodoList(titleSearch)),
    shareReplay(),
  )

  completedTodoList$ = this.searchList$.pipe(
    map(list => list.filter(li => li.completed)),
  );

  uncompletedTodoList$ = this.searchList$.pipe(
    map(list => list.filter(li => !li.completed))
  );

  totalLength$ = this.searchList$.pipe(
    map(v => v.length)
  )

  completedLength$ = this.completedTodoList$.pipe(
    map(v => v.length)
  )

  uncompletedLength$ = this.uncompletedTodoList$.pipe(
    map(v => v.length)
  )

  triggerSearch(title = this.searchByTitle$.getValue()) {
    this.searchByTitle$.next(title)
  }

  getTodoList(searchValue?: string) {
    return this.todoService.getTodoList(searchValue).pipe(
      this.ues.withEffects()
    )
  }

  onDeleteTodo(todoId: number) {
    this.modalsService.confirmDelete({
      title: 'Sure delete?'
    }).pipe(
      filter(Boolean), // Only "yes"
      switchMap(_ => this.todoService.deleteTodo(todoId).pipe(
        this.ues.withEffects()
      )),
      tap(_ => this.triggerSearch()),
    ).toPromise()
  }

  onAddTodo() {
    this.modalsService.addTodoModal()
      .pipe(
        switchMap(todo => this.todoService.addTodo(todo)
          .pipe(
            tap(newTodo => this.ns.notify({
              type: 'success',
              message: `${newTodo.title} successfully added`
            })),
            this.ues.withEffects()
          )),
        tap(_ => this.triggerSearch()),
      ).toPromise()
  }

  onUpdateTodo(todo: Todo) {
    this.modalsService.updateTodoModal(todo).pipe(
      switchMap((updatedTodo) => this.todoService.updateTodo(updatedTodo.id, updatedTodo).pipe(
        tap(updatedTodo => {
          this.ns.notify({
            type: 'success',
            message: `${todo.title} successfully updated`
          })
        }),
        this.ues.withEffects()
      )),
      tap(_ => this.triggerSearch())
    ).toPromise()
  }
}
