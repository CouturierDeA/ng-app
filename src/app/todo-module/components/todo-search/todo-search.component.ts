import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef, AfterViewInit
} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {RxTodoStore} from "../../rx-store/todo.store";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'TodoSearch',
  templateUrl: './todo-search.component.html'
})
export class TodoSearchComponent implements AfterViewInit, OnDestroy {
  constructor(private todoStore: RxTodoStore) {
  }
  search$ = this.todoStore.search$
  @ViewChild('input', {read: ElementRef})
  inputRef!: ElementRef<HTMLInputElement>;
  inputSub!: Subscription
  ngAfterViewInit() {
    this.inputSub = fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map(event => (event.target as HTMLInputElement)?.value),
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(search => this.search$?.next(search))
  }
  ngOnDestroy() {
    this.inputSub?.unsubscribe();
  }
}
