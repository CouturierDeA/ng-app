import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from "../../domain/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  controlsDisabled?: boolean | null

  @Input()
  todoList?: Todo[] | null

  @Output()
  onUpdate = new EventEmitter<Todo>()

  @Output()
  onDelete = new EventEmitter<Todo>()

  onUpdateClick(todo: Todo){
    this.onUpdate.emit(todo)
  }

  onDeleteClick(todo: Todo){
    this.onDelete.emit(todo)
  }
}
