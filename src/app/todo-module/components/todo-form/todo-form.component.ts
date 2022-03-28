import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Todo} from "../../domain/todo";
import {NgForm} from "@angular/forms";

export interface TodoFormComponentProps {
  formTitle?: string
  todo?: Todo | null
}

/**
 * Provides form to create or edit entity
 */
@Component({
  selector: 'TodoForm',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements TodoFormComponentProps {
  @ViewChild('updateForm')
  updateForm!: NgForm
  @Input()
  formTitle?: string
  @Input()
  todo?: Todo | null = new class implements Todo {
    completed = false;
    description = '';
    id = NaN;
    title = '';
  }

  @Output()
  resolveEvent = new EventEmitter<Todo>();
  @Output()
  cancelEvent = new EventEmitter<void>();

  onSubmit(todo: Todo) {
    this.resolveEvent.emit(todo);
  }

  onCancel(event: Event) {
    event.preventDefault()
    this.cancelEvent.emit()
  }
}
