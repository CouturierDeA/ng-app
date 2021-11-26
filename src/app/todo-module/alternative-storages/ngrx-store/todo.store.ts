import {ActionReducerMap, MetaReducer, on} from "@ngrx/store";
import {todoReducer} from "./todo.actions";
import {TodoState} from "./todo.state";
import {environment} from "../../../environments/environment";

export interface State {
  todoList: TodoState
}

export const todoReducers: ActionReducerMap<State> = {
  todoList: todoReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
