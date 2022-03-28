import {Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ESCAPE_HTTP_ERROR_NOTIFICATION} from "../tokens";
import {NotificationService} from "../../notification-module/services/notification.service";

@Injectable()
export class HttpNotificationInterceptor implements HttpInterceptor {
  constructor(
    private ns: NotificationService,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const noErr = req.context.get(ESCAPE_HTTP_ERROR_NOTIFICATION)
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          !noErr && this.ns.notify({
            message: error?.message,
            type: 'danger'
          })
        }
      })
    )
  }
}
