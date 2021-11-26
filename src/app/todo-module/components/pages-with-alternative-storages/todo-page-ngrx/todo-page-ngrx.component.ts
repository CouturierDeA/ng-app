import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ACTION_TODO_DELETE,
  ACTION_TODO_UPDATE,
  ACTION_TODO_ADD,
  QUERY_TODO_LIST,
  COMMIT_TODO_SEARCH,
} from "../../../alternative-storages/ngrx-store/todo.actions";
import {Store} from "@ngrx/store";
import {Todo} from "../../../domain/todo";
import {
  SELECTOR_TODO_SEARCH,
  SELECTOR_TODO_ITEMS_BY_SERCH,
  SELECTOR_TODO_LIST
} from "../../../alternative-storages/ngrx-store/todo.selectors";

@Component({
  selector: 'TodoPageNgrx',
  templateUrl: './todo-page.component.html'
})
export class TodoPageNgrxComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {
  }

  todoList$ = this.store.select(SELECTOR_TODO_ITEMS_BY_SERCH)
  newTodo?: Todo
  isUpdateActivated = false
  isAddActivated = false

  ngOnInit() {
    this.readTodoList()
  }

  ngOnDestroy() {
  }

  readTodoList = () => {
    this.store.dispatch(QUERY_TODO_LIST())
  }

  deleteTodo(todoId: number) {
    this.store.dispatch(ACTION_TODO_DELETE({id: todoId}))
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(ACTION_TODO_UPDATE({todo: todo}))
    this.isUpdateActivated = false;
    this.newTodo = undefined;
  }

  addTodo(todo: Todo) {
    this.store.dispatch(ACTION_TODO_ADD({
      todo: todo!
    }))
    this.isAddActivated = false;
    this.newTodo = undefined;
  }

  showUpdateForm(todo: Todo) {
    this.newTodo = {...todo};
    this.isUpdateActivated = true;
  }

  showAddForm() {
    this.newTodo = {
      id: NaN,
      title: '',
      description: '',
    };
    this.isAddActivated = true;
  }

  search$ = this.store.select(SELECTOR_TODO_SEARCH)

  onSearch(search: string) {
    this.store.dispatch(COMMIT_TODO_SEARCH({
      search
    }))
  }
}
