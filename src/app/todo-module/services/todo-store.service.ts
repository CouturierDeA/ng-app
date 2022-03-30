import {Injectable} from '@angular/core';
import {combineLatest, map} from 'rxjs';
import {Todo} from "../domain/todo";
import {BehaviorSubject} from "rxjs";

/**
 * To do Reactive storage
 */
@Injectable()
export class TodoStoreService {
  searchByTitle$ = new BehaviorSubject('')
  searchList$ = new BehaviorSubject<Todo[]>([])
  searchParams$ = combineLatest([this.searchByTitle$])

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
}
