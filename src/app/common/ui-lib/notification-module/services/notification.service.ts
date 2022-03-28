import {Injectable} from "@angular/core";
import {NotificationType} from "../domain/notification";
import {BehaviorSubject} from 'rxjs';

export type NotifyOptions = {
  message?: Error | string,
  type?: NotificationType
  lifeTime?: number
}

@Injectable()
export class NotificationService {
  notificationList$: BehaviorSubject<NotifyOptions[]> = new BehaviorSubject<NotifyOptions[]>([])

  notify(n: NotifyOptions) {
    const {notificationList$} = this;
    const ov = notificationList$.getValue()
    notificationList$.next(
      [...ov, n]
    )
    return () => this.removeNotification(n);
  }

  removeNotification(n: NotifyOptions) {
    const {notificationList$} = this;
    const ov = notificationList$.getValue()
    const index = ov.indexOf(n)
    if (index > -1) {
      const ns = ov.filter((v: NotifyOptions) => v !== n)
      notificationList$.next(ns)
    }
  }
}
