import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TodoPageComponent} from "./components/todo-page/todo-page.component";

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
