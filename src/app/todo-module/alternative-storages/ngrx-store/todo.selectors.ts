import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TodoState} from "./todo.state";


export const featureSelector = createFeatureSelector<TodoState>(
  'todoList' /* Todo: ngrx типизация отсутствует, пиши любой гарбаж: скомпилируется, в runtime будет ошибка (кроме значения  'todoList')*/
);
export const SELECTOR_TODO_LIST = createSelector(
  featureSelector,
  (state) => {
    return state.todoList
  }
)

export const SELECTOR_TODO_SEARCH = createSelector(
  featureSelector,
  (state) => {
    return state.search
  }
)

export const SELECTOR_TODO_ITEMS_BY_SERCH = createSelector(
  featureSelector,
  (state) => {
    return state.todoList.filter(todo => state.search ? todo.title.includes(state.search) : todo)
  }
)



