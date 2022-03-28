import {Component, ElementRef, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {NotificationService, NotifyOptions} from "../../services/notification.service";
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: '*',
        transform: 'translateX(0)', opacity: 1
      })),
      transition(':enter', [
        style({ height: '0px', transform: 'translateX(100%)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            height: '*'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition(':leave', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(100%)',
            height: '0px'
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ]),
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
