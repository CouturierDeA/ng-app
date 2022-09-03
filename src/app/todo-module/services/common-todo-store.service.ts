import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {Todo} from "../domain/todo";
import {BehaviorSubject} from "rxjs";

/**
 * To do Reactive storage
 */
@Injectable()
export class CommonTodoStoreService {
  list$ = new BehaviorSubject<Todo[]>([])

  completedTodoList$ = this.list$.pipe(
    map(list => list.filter(li => li.completed)),
  );

  uncompletedTodoList$ = this.list$.pipe(
    map(list => list.filter(li => !li.completed))
  );

  totalLength$ = this.list$.pipe(
    map(v => v.length)
  )

  completedLength$ = this.completedTodoList$.pipe(
    map(v => v.length)
  )

  uncompletedLength$ = this.uncompletedTodoList$.pipe(
    map(v => v.length)
  )
}
