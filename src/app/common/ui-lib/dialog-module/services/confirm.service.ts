import {Component, EventEmitter, Injectable, Input, Output} from "@angular/core";
import {DialogService} from "./dialog.service";
import {DialogComponent} from "../../domain/dialog-component";

// Todo: add unit tests
@Component({
  selector: 'app-confirm',
  template: `
    <div class="app-dialog app-table">
      <h4 class="app-dialog__title">
        {{title}}
      </h4>
      <div class="app-dialog__controls">
        <app-button class="app-dialog__control" (click)="resolveEvent.emit(false)">{{cancelText}}</app-button>
        <app-button [viewType]="'success'" class="app-dialog__control"
                    (click)="resolveEvent.emit(true)">{{okText}}</app-button>
      </div>
    </div>
  `
})
export class ConfirmComponent implements DialogComponent<boolean> {
  @Input()
  title?: string

  @Input()
  okText: string = 'Ok'

  @Input()
  cancelText?: string = 'Cancel'

  @Output()
  resolveEvent = new EventEmitter<boolean>()

  @Output()
  cancelEvent = new EventEmitter()
}

export type ConfirmOptionsType = {
  title: string,
  cancelText?: string
  okText?: string
}

@Injectable()
export class ConfirmService {
  constructor(
    private ds: DialogService
  ) {
  }

  confirm(options: ConfirmOptionsType) {
    return this.ds.addDialog<ConfirmOptionsType, boolean>({
      component: ConfirmComponent,
      componentOptions: options
    })
  }
}
