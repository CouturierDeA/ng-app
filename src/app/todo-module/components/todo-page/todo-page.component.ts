import {Component, OnInit} from '@angular/core';
import {TodoCrudService} from "../../services/todo-crud.service";
import {TodoStoreService} from "../../services/todo-store.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  constructor(
    public store: TodoStoreService,
    public todoService: TodoCrudService,
  ) {
  }

  ngOnInit() {
    this.todoService.readTodoList()
  }
}
