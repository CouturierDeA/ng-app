import {Component, Input, Output, EventEmitter, TemplateRef, ViewChild, OnInit} from '@angular/core';
import {Todo} from "../../domain/todo";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'TodoForm',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @ViewChild('form')
  form!: NgForm
  @Input()
  todo?: Todo

  @Output()
  submitEvent = new EventEmitter<Todo>();
  @Output()
  cancelEvent = new EventEmitter<void>();

  onSubmit(course: Todo) {
    if (this.form.invalid) {
      return
    }
    this.submitEvent.emit(course);
  }

  onCancel(event: Event) {
    event.preventDefault()
    this.cancelEvent.emit()
  }
}
