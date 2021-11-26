import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ElementRef, AfterViewInit
} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subscription} from "rxjs";
import {RxTodoStore} from "../../rx-store/todo.store";
import {debounceTime, distinctUntilChanged, map, tap} from "rxjs/operators";

@Component({
  selector: 'TodoSearch',
  templateUrl: './todo-search.component.html'
})
export class TodoSearchComponent implements AfterViewInit, OnDestroy {
  @Input()
  search$?: BehaviorSubject<string>

  @ViewChild('input', {read: ElementRef})
  inputRef!: ElementRef<HTMLInputElement>;

  @Output()
  onSearch = new EventEmitter<string>()

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
