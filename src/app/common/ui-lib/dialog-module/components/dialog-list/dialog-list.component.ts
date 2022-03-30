import {Component} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {tap} from "rxjs";
import {NotificationParams} from "../../domain/notification";
import {animate, group, style, transition, trigger} from "@angular/animations";
export const fadeInOutAnimation = trigger("fadeInOut", [
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('0.3s ease', style({
        opacity: 1
      }))
    ])
  ]),
  transition(':leave', [
    group([
      animate('0.3s ease', style({
        opacity: 0
      }))
    ])
  ])
])
/**
 * Renders app dialog list
 */
@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss'],
  animations: [
    fadeInOutAnimation
  ]
})
export class DialogListComponent {
  constructor(
    private ds: DialogService
  ) {
  }

  dialogsCount = 0
  dialogList$ = this.ds.dialogList$.pipe(
    tap((v: NotificationParams[]) => {
      this.dialogsCount = v.length
    })
  )

  remove(n: NotificationParams) {
    n.resolver?.complete()
  }
}
