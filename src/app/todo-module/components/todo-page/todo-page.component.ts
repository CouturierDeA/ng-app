import {Component, OnInit} from '@angular/core';
import {TodoCrudService} from "../../services/todo-crud.service";
import {CommonTodoStoreService} from "../../services/common-todo-store.service";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  constructor(
    public store: CommonTodoStoreService,
    public todoService: TodoCrudService,
  ) {
  }

  ngOnInit() {
    this.todoService.readTodoList()
  }
}
