import {Component} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {tap} from "rxjs";
import {NotificationParams} from "../../domain/notification";
/**
 * Renders app dialog list
 */
@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
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
