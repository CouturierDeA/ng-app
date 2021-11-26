import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig, EntityState} from '@datorama/akita';
import {Todo} from "../domain/todo";

export interface TodoState extends EntityState<Todo, number> {
  areListLoaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'todoList'})
export class TodoStore extends EntityStore<TodoState> {

  constructor() {
    const state = {
      todoList: [] as Todo[],
      search: '',
      loaded: false,
      // searchASDASDSADAS: false, // Todo: типизация отсутствует, пиши любой гарбаж, даже не смотря на extends EntityStore<TodoState>
    }
    super(state);
  }

  setTodoList(todoList: Todo[], loaded: boolean) {
    this.set(todoList);
    this.update(state => ({
      ...state,
      todoList,
      loaded,
      // areCoursesLoaASDSADASDSADSAD: todoList // Todo: типизация отсутствует, пиши любой гарбаж
      // areCoursesLoaded: 'sdasdasd', // Todo: типизация отсутствует, пиши любой гарбаж
    }));
  }

  updateSearch(search: string) {
    this.update(state => ({
      ...state,
      search
    }));
  }
}
