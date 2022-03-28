import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {HttpTodoService} from "./services/http-todo.service";
import {TodoCrudService} from "./services/todo-crud.service";

import {TodoFormComponent} from "./components/todo-form/todo-form.component";
import {TodoPageComponent} from "./components/todo-page/todo-page.component";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {TodoSearchComponent} from "./components/todo-search/todo-search.component";

import {UniqueValueDirective} from "./directives/validations/unique.directive";

import {TodoRoutingModule} from "./todo-routing.module";
import {UiModule} from "../common/ui-lib/ui.module";
import {TodoModalsService} from "./services/todo-modals.service";

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
    UiModule,
  ],
  providers: [
    HttpTodoService,
    // uncomment this line and import MockHttpTodoService to use mocks in runtime
    // {provide: HttpTodoService, useClass: MockHttpTodoService},
    TodoCrudService,
    TodoModalsService,
  ],
})
export class TodoModule {
}
