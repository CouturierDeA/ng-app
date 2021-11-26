import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from "../../domain/todo";

@Component({
  selector: 'TodoForm',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  @Input()
  todo?: Todo

  @Output()
  submitEvent = new EventEmitter<Todo>();

  onSubmit(course: Todo) {
    this.submitEvent.emit(course);
  }

}
