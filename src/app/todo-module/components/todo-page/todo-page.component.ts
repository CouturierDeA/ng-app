import {Component, OnInit} from '@angular/core';
import {Todo} from "../../domain/todo";
import {
  BehaviorSubject,
  combineLatest,
} from "rxjs";
import {
  map,
} from "rxjs/operators";
import {RxTodoStore} from "../../rx-store/todo.store";
import {RxTodoService} from "../../rx-store/todo.service";

@Component({
  selector: 'TodoPageRx',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  constructor(
    private todoService: RxTodoService,
    public todoStore: RxTodoStore,
  ) {
  }

  newTodo$ = new BehaviorSubject<Todo | null>(null)
  updateFormVisible$ = new BehaviorSubject(false)
  addFormVisible$ = new BehaviorSubject(false)

  controlsDisabled$ = combineLatest(
    [this.updateFormVisible$, this.addFormVisible$]
  ).pipe(
    map(([updateFormVisible, addFormVisible]) => updateFormVisible || addFormVisible)
  )

  ngOnInit() {
    this.readTodoList()
  }

  readTodoList() {
    this.todoService.readTodoList().toPromise();
  }

  showUpdateForm(todo: Todo) {
    this.newTodo$.next({...todo})
    this.updateFormVisible$.next(true)
  }

  showAddForm() {
    this.newTodo$.next(new class implements Todo {
      completed = undefined;
      description = '';
      id = NaN;
      title = '';
    })
    this.addFormVisible$.next(true)
  }

  onSubmitCancel() {
    this.closeForm()
  }

  closeForm() {
    this.updateFormVisible$.next(false)
    this.addFormVisible$.next(false)
    this.newTodo$.next(null)
  }

  doDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id).toPromise()
  }

  onAddTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(_ => this.closeForm())
  }

  onUpdateTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id, todo).subscribe(_ => this.closeForm())
  }
}
