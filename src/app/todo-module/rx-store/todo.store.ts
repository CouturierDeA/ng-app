import {Injectable} from '@angular/core';
import {Todo} from "../domain/todo";
import {Store} from "./store";
import {map, share, shareReplay} from "rxjs/operators";
import {BehaviorSubject, combineLatest} from "rxjs";

@Injectable()
export class RxTodoStore extends Store<Todo> {
  search$ = new BehaviorSubject('')

  searchList$ = combineLatest([this.entities$, this.search$])
    .pipe(
      map(([list, searchValue]) => list.filter(
        todoItem => searchValue ? todoItem.title.includes(searchValue) : true)
      ),
      shareReplay()
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
}
