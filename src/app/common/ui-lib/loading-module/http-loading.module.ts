import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpLoadingInterceptor} from "./interceptors/http-loading.interceptor";

/**
 * HttpLoadingInterceptor - позволяет изменять состояние
 * LoadingService->loading$
 * при каждом запросе
 * если нужно не показывать loader
 * - нужно передать ESCAPE_LOADING_TOKEN в контексте запроса
 * Пример
 * this.httpClient.get('/api/weather', {
 *   context: new HttpContext().set(ESCAPE_LOADING_TOKEN, true)
 * }).subscribe(...);
 *
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    }
  ],
})
export class HttpLoadingModule {

}
