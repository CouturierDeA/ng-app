import {Injectable} from '@angular/core';
import {Todo} from "../domain/todo";
import {Store} from "./store";

@Injectable()
export class RxTodoStore extends Store<Todo> {

}
