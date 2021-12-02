import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import {RxTodoStore} from "./rx-store/todo.store";
import {TodoService} from "./services/todo.service";
import {RxTodoService} from "./rx-store/todo.service";

import {TodoFormComponent} from "./components/todo-form/todo-form.component";
import {TodoPageComponent} from "./components/todo-page/todo-page.component";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {TodoSearchComponent} from "./components/todo-search/todo-search.component";

import {UniqueValueDirective} from "./directives/validations/unique.directive";
import {TodoRoutingModule} from "./todo-routing.module";
//
// import {getTodoServiceMocks} from "./components/todo-page/specs/utils";
//
// const mocks = getTodoServiceMocks()

@NgModule({
  declarations: [
    TodoPageComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoSearchComponent,
    UniqueValueDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoRoutingModule,
  ],
  providers: [
    // {provide: TodoService, useValue: mocks.service},
    TodoService,
    RxTodoService,
    RxTodoStore,
    TodoRoutingModule,
    HttpClient
  ],
})
export class TodoModule {
}
