import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from "../../domain/todo";

@Component({
  selector: 'TodoList',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  controlsDisabled?: boolean

  @Input()
  todoList?: Todo[] | null

  @Output()
  onUpdate = new EventEmitter<Todo>()

  @Output()
  onDelete = new EventEmitter<Todo>()

  update(todo: Todo){
    this.onUpdate.emit(todo)
  }

  delete(todo: Todo){
    this.onDelete.emit(todo)
  }
}
