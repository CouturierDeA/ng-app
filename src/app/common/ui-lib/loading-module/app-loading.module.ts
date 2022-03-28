import {NgModule} from "@angular/core";
import {LoadingService} from "./services/loading/loading.service";
import {LoadingComponent} from "./components/app-loading/loading.component";
import {CommonModule} from "@angular/common";
import {GlobalLoadingComponent} from "./components/app-global-loading/loading.component";

/**
 * Модуль, позволяющий показывать индикатор загрузки на странице
 * включает в себя GlobalLoadingComponent - полагающийся на значения из LoadingService
 * и LoadingComponent - для использования отдельно от LoadingService
 *
 * для декларативного отображения индикатора "loading" во время каждого запроса,
 * используйте HttpLoadingModule внутри любого из дочерних или соседних с этим модулей
 */
@NgModule({
  declarations: [
    GlobalLoadingComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoadingService,
  ],
  bootstrap: [],
  exports: [
    GlobalLoadingComponent,
    LoadingComponent
  ]
})
export class AppLoadingModule {

}
