import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpNotificationInterceptor} from "./interceptors/http-notification.interceptor";
import {AppNotificationModule} from "./app-notification.module";

@NgModule({
  imports:[
    HttpClientModule,
    AppNotificationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpNotificationInterceptor,
      multi: true
    }
  ],
})
export class HttpNotificationModule {
}
