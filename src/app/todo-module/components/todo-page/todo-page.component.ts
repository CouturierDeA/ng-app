import {Component, OnInit} from '@angular/core';
import {TodoCrudService} from "../../services/todo-crud.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {
  constructor(
    public todoService: TodoCrudService,
  ) {
  }
}
