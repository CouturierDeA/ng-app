import {Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoadingService} from "../services/loading/loading.service";
import {finalize} from "rxjs/operators";
import {ESCAPE_LOADING_TOKEN} from "../tokens";

/**
 * HttpLoadingInterceptor - позволяет изменять состояние
 * LoadingService->loading$
 * при каждом запросе
 * если нужно не показывать блокирующий страницу loader
 * - нужно передать ESCAPE_LOADING_TOKEN в request контекст соответственно
 */
@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private ls: LoadingService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const {ls} = this;
    const noLoading = req.context.get(ESCAPE_LOADING_TOKEN);

    let id: undefined | number;
    if (!noLoading) {
      ls.setBusy()
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!noLoading) {
          ls.setNoBusy()
        }
      })
    )
  }
}
