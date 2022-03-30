import {Component, ElementRef, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {NotificationService, NotifyOptions} from "../../services/notification.service";
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {flyInOut} from "../../../animations/fly-in-out";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  animations: [
    flyInOut
  ],
})
export class NotificationListComponent {
  constructor(
    private ns: NotificationService,
  ) {

  }

  @ViewChild('list')
  list!: ElementRef

  hovered = false;
  notificationsCount = 0
  notificationList$ = this.ns.notificationList$.pipe(
    tap((v: NotifyOptions[]) => {
      this.notificationsCount = v.length;
    })
  )

  // scrollToBottom() {
  //   const el = this.list.nativeElement;
  //   el.scrollTop = el.clientHeight
  // }

  remove(n: NotifyOptions) {
    this.ns.removeNotification(n);
  }
}
