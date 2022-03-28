import {Subject} from "rxjs";
import {EventEmitter} from "@angular/core";

export interface DialogControls {
  disable: (state: boolean) => void,
  isDisabled: () => boolean,
}
export interface DialogComponent<R = any> {
  resolver?: Subject<R>
  dialogControls?: DialogControls
  resolveEvent?: EventEmitter<R>
  cancelEvent?: EventEmitter<void>
  errorEvent?: EventEmitter<Error | string>
}
