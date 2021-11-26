// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {HttpClientModule} from '@angular/common/http';
//
// import {FormsModule} from "@angular/forms";
// import {StoreModule} from "@ngrx/store";
// import {EffectsModule} from "@ngrx/effects";
// import {TodoPageComponent} from './todo-page.component';
//
// import {todoReducers} from "./ngrx-store/todo.store";
// import {TodoService} from "./services/todo.service";
// import {TodoPageNgrxComponent} from "./components/todo-page-ngrx/todo-page-ngrx.component";
// import {TodoPageAkitaComponent} from "./components/todo-page-akita/todo-page-akita.component";
//
// import {TodoEffects} from "./ngrx-store/todo.effects";
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import {AkitaTodoService} from "./akita-store/todo.service";
// import {TodoFormComponent} from "./components/todo-form/todo-form.component";
// import {RxTodoService} from "./rx-store/todo.service";
// import {TodoPageRxComponent} from "./components/todo-page-rx/todo-page-rx.component";
// import {RxTodoStore} from "./rx-store/todo.store";
// import {TodoRoutingModule} from "./todo-routing.module";
// import {environment} from "../../environments/environment";
// import {AppSelectComponent} from "../common/app-select/app-select.component";
// import {TodoListComponent} from "./components/todo-list/todo-list.component";
// import {TodoSearchComponent} from "./components/todo-search/todo-search.component";
// import {UniqueValueDirective} from "./directives/validations/unique.directive";
// // import {getTodoServiceMocks} from "./components/todo-page-rx/specs/utils";
// // const mocks = getTodoServiceMocks()
// @NgModule({
//   declarations: [
//     TodoPageComponent,
//     TodoPageAkitaComponent,
//     TodoPageNgrxComponent,
//     TodoPageRxComponent,
//     TodoFormComponent,
//     AppSelectComponent,
//     TodoListComponent,
//     TodoSearchComponent,
//     UniqueValueDirective
//   ],
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     FormsModule,
//     TodoRoutingModule,
//     StoreModule.forRoot(todoReducers),
//     StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
//     EffectsModule.forRoot([TodoEffects])
//   ],
//   providers: [
//     // {provide: TodoService, useValue: mocks.service},
//     TodoService,
//     AkitaTodoService,
//     RxTodoService,
//     RxTodoStore,
//     TodoServerEventsService
//   ]
// })
// export class TodoModule {
// }
