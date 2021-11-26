import {Injectable} from '@angular/core';
import {TodoStore, TodoState} from './todo.store';
import {QueryEntity} from '@datorama/akita';
import {Todo} from "../domain/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoQuery extends QueryEntity<TodoState> {
  constructor(protected store: TodoStore) {
    super(store);
  }

  search$ = this.select(state => state.search); //Todo: akita отсутствует типизация несмотря на extends QueryEntity<TodoState>
  todoList$ = this.select((state) => {
    const search = state.search; //Todo: akita отсутствует типизация
    const todoList = state.todoList as Todo[] //Todo: akita отсутствует типизация
    return todoList.filter(todo => search ? todo.title.includes(search) : todo)
  })
}
