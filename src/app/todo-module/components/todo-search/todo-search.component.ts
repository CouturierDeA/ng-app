import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef, AfterViewInit
} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {TodoCrudService} from "../../services/todo-crud.service";
import {TodoStoreService} from "../../services/todo-store.service";

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html'
})
export class TodoSearchComponent implements AfterViewInit, OnDestroy {
  constructor(
    private store: TodoStoreService,
    private todoService: TodoCrudService
  ) {
  }

  @ViewChild('input', {read: ElementRef})
  inputRef!: ElementRef<HTMLInputElement>;
  inputSub!: Subscription
  searchByTitle$ = this.store.searchByTitle$

  ngAfterViewInit() {
    this.inputSub = fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map(event => (event.target as HTMLInputElement)?.value),
      distinctUntilChanged(),
      debounceTime(500),
      tap(title => this.searchByTitle$.next(title)),
      switchMap(_ => this.todoService.readTodoListPipe()),
    ).subscribe()
  }

  ngOnDestroy() {
    this.inputSub?.unsubscribe();
  }
}
