import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import {TodoResolver} from "./todo-module/resolvers/todo.resolver";

const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./todo-module/todo.module').then(mod => mod.TodoModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
