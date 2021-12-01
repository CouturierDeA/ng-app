import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Todo} from "../../domain/todo";
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Subscription,
} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
} from "rxjs/operators";
import {RxTodoStore} from "../../rx-store/todo.store";
import {RxTodoService} from "../../rx-store/todo.service";

@Component({
  selector: 'TodoPageRx',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit, OnDestroy, AfterViewInit {
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

  @ViewChild('searchInput', {read: ElementRef})
  inputRef!: ElementRef<HTMLInputElement>;
  inputSub!: Subscription


  ngOnInit() {
    this.readTodoList()
  }

  readTodoList() {
    this.todoService.readTodoList().toPromise();
  }

  ngAfterViewInit() {
    this.inputSub = fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map(event => (event.target as HTMLInputElement)?.value),
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(search => {
      this.todoStore.search$?.next(search)
    })
  }

  ngOnDestroy() {
    this.inputSub?.unsubscribe(); // не забываем отписаться, воизбежание утечек памяти
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
