import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef, AfterViewInit
} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {TodoCrudService} from "../../services/todo-crud.service";

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html'
})
export class TodoSearchComponent implements AfterViewInit, OnDestroy {
  constructor(
    private todoService: TodoCrudService
  ) {
  }

  @ViewChild('input', {read: ElementRef})
  inputRef!: ElementRef<HTMLInputElement>;
  inputSub!: Subscription
  searchByTitle$ = this.todoService.searchByTitle$

  ngAfterViewInit() {
    this.inputSub = fromEvent(this.inputRef.nativeElement, 'input').pipe(
      map(event => (event.target as HTMLInputElement)?.value),
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(title => this.todoService.triggerSearch(title))
  }

  ngOnDestroy() {
    this.inputSub?.unsubscribe();
  }
}
