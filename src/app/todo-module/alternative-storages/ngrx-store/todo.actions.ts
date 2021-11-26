import {createAction, createReducer, on, props} from '@ngrx/store'
import {initialState} from './todo.state'
import {Todo} from "../domain/todo";

export const QUERY_TODO_LIST = createAction('[TODO] QUERY_TODO_LIST')
export const COMMIT_TODO_LIST = createAction('[TODO] COMMIT_TODO_LIST', props<{ todoList: Todo[] }>())
export const COMMIT_TODO_ADD = createAction('[TODO] add', props<{ todo: Todo }>())
export const ACTION_TODO_DELETE = createAction('[TODO] ACTION_TODO_DELETE', props<{ id: Todo['id'] }>())
export const COMMIT_TODO_DELETE = createAction('[TODO] COMMIT_TODO_DELETE', props<{ id: Todo['id'] }>())
export const COMMIT_CLEAR_TODO_LIST = createAction('[TODO] COMMIT_CLEAR_TODO_LIST')
export const COMMIT_TODO_SEARCH = createAction('[TODO] COMMIT_TODO_SEARCH', props<{ search: string }>())

export const ACTION_TODO_UPDATE = createAction('[TODO] ACTION_TODO_UPDATE', props<{ todo: Todo }>())
export const ACTION_TODO_ADD = createAction('[TODO] ACTION_TODO_ADD', props<{ todo: Todo }>())
export const COMMIT_TODO_UPDATE = createAction('[TODO] COMMIT_TODO_UPDATE', props<{ todo: Todo }>())

export const todoReducer = createReducer(
  initialState,
  on(COMMIT_TODO_LIST, (state, action) => ({
    ...state,
    todoList: action.todoList
  })),
  on(COMMIT_TODO_DELETE, (state, action) => ({
    ...state,
    todoList: state.todoList.filter(c => c.id !== action.id)
  })),
  on(COMMIT_TODO_UPDATE, (state, action) => {
    const {todo: newTodo} = action;
    const {todoList: oldTodoList} = state;
    const todoList = oldTodoList.map((todo, i) => todo.id === newTodo.id ? newTodo : todo);
    return {
      ...state,
      todoList
    };
  }),
  on(COMMIT_CLEAR_TODO_LIST, (state) => ({
    ...state,
    todoList: [],
    todoListsadasd: [], // Todo: ngrx типизация отсутствует, пиши любой гарбаж
    someGarbage: [] // Todo: ngrx типизация отсутствует, пиши любой гарбаж
  })),
  on(COMMIT_TODO_ADD, (state, action) => {
    const todoList = [...state.todoList, action.todo];
    return {
      ...state,
      todoList
    }
  }),
  on(COMMIT_TODO_SEARCH, (state, action) => {
    return {
      ...state,
      search: action.search
    }
  }),
)
