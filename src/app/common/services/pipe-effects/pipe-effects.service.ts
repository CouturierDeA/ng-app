import {Injectable} from "@angular/core";
import {LoadingService} from "../../ui-lib/loading-module/services/loading/loading.service";
import {Observable, of} from "rxjs";
import {finalize, switchMap, tap} from "rxjs/operators";
import {NotificationService} from "../../ui-lib/notification-module/services/notification.service";

/**
 * Provide side effects for Observable and angular Http pipes
 * 1)  "withLoader" adds loading indicator on start of async pipe execution and removes it on end
 * 2) "withErrorNotification" - shows Observable error (if it happens) to the user
 * 3) withEffects - adds both "withLoader" and "withErrorNotification"
 * 3) withSuccessNotification - adds message on each "next" tap
 *
 */
@Injectable()
export class PipeEffectsService {
  constructor(
    private ls: LoadingService,
    private ns: NotificationService,
  ) {
  }

  withEffects<T>() {
    return (source: Observable<T>) =>
      of({}).pipe(
        tap(this.getBusyTap()),
        switchMap((o) => source.pipe(
          tap(this.getNotifyErrorTap()),
          finalize(this.getNoBusyTap())
        )));
  }

  withLoader<T>() {
    return (source: Observable<T>) => of({})
      .pipe(
        tap(this.getBusyTap()),
        switchMap((o) => source.pipe(
          finalize(this.getNoBusyTap())
        )));
  }


  withErrorNotification<T>() {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source.pipe(
          tap(this.getNotifyErrorTap()),
        )));
  }

  private getNoBusyTap() {
    return () => this.ls.setNoBusy()
  }

  private getBusyTap() {
    return () => this.ls.setBusy()
  }

  private getNotifyErrorTap() {
    return {
      error: (error: Error) => {
        this.ns.notify({
          message: error?.message || error,
          type: 'danger',
          lifeTime: Infinity
        })
      }
    }
  }

  withSuccessNotification<T>(getMessage: (result: T) => string) {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source.pipe(
          tap(this.getSuccessErrorTap(getMessage))
        )));
  }

  private getSuccessErrorTap<T>(getMessage: (result: T) => string) {
    return {
      next: (result: T) => {
        this.ns.notify({
          message: getMessage(result),
          type: 'success',
          lifeTime: 2000
        })
      }
    }
  }
}
