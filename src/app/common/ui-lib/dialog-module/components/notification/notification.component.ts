import {Component, Input} from '@angular/core';
import {NotificationData} from "../../domain/notification";
import {DialogComponent, DialogControls} from "../../../domain/dialog-component";
import {Subject} from "rxjs";

/**
 * компонент для индикации процесса загрузки
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements DialogComponent {
  @Input()
  dialogControls?: DialogControls
  @Input()
  title?: string
  message?: Error | string
  @Input()
  width: string = '500px'
  @Input()
  type?: NotificationData['type']
  @Input()
  resolver!: Subject<any>

  cancel() {
    this.resolver.complete()
  }
}
