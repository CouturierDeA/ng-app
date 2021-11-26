import {Todo} from "../domain/todo";

export const initialState = {
  todoList: [] as Todo[],
  search: ''
}

export type TodoState = typeof initialState
