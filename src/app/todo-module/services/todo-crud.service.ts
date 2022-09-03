import {Injectable} from '@angular/core';
import {filter, switchMap, tap} from 'rxjs';

import {HttpTodoService} from "./http-todo.service";
import {Todo} from "../domain/todo";
import {PipeEffectsService} from "../../common/services/pipe-effects/pipe-effects.service";
import {TodoModalsService} from "./todo-modals.service";
import {TodoStoreService} from "./todo-store.service";
import {first} from "rxjs/operators";

/**
 * All Logic of this module goes here
 */
@Injectable()
export class TodoCrudService {
    constructor(
        private store: TodoStoreService,
        private modalsService: TodoModalsService,
        private todoService: HttpTodoService,
        private pes: PipeEffectsService,
    ) {
    }

    readTodoList() {
        this.readTodoListPipe().toPromise()
    }

    onDeleteTodo(todoId: number) {
        this.modalsService.confirmDelete({
            title: 'Sure delete?'
        }).pipe(
            filter(Boolean), // Only "yes"
            switchMap(_ => this.todoService.deleteTodo(todoId).pipe(
                this.pes.withSuccessNotification((() => `Successfully deleted`)),
                this.pes.withEffects()
            )),
            switchMap(_ => this.readTodoListPipe())
        ).toPromise()
    }

    onAddTodo() {
        this.modalsService.addTodoModal().pipe(
            switchMap(todo => this.todoService.addTodo(todo).pipe(
                this.pes.withEffects(),
                this.pes.withSuccessNotification((newTodo => `${newTodo.title} successfully added`)),
            )),
            switchMap(_ => this.readTodoListPipe()),
        ).toPromise()
    }

    onUpdateTodo(todo: Todo) {
        this.modalsService.updateTodoModal(todo).pipe(
            switchMap((updatedTodo) => this.todoService.updateTodo(updatedTodo.id, updatedTodo).pipe(
              this.pes.withEffects(),
              this.pes.withSuccessNotification((newTodo => `${newTodo.title} successfully updated`)),
            )),
            switchMap(_ => this.readTodoListPipe()),
        ).toPromise()
    }

    readTodoListPipe() {
        return this.store.searchParams$.pipe(
            first(),
            switchMap(([titleSearch]) => this.todoService.getTodoList(titleSearch)),
            tap(todoList => this.store.searchList$.next(todoList)),
            this.pes.withEffects(),
        )
    }
}
