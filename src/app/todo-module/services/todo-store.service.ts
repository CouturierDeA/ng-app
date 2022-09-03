import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';
import {BehaviorSubject} from "rxjs";
import {CommonTodoStoreService} from "./common-todo-store.service";

/**
 * To do Reactive storage with search
 */
@Injectable()
export class TodoStoreService {
  constructor(
    private store: CommonTodoStoreService
  ) {
  }
  searchList$ = this.store.list$
  searchByTitle$ = new BehaviorSubject('')
  searchParams$ = combineLatest([this.searchByTitle$])
}
