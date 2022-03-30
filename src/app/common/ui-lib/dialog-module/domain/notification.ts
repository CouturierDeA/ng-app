import {
  Injector,
  Type
} from "@angular/core";

import {Subject} from "rxjs";
import {DialogComponent} from "../../domain/dialog-component";

export type NotificationType = 'danger' | 'warning' | 'success' | 'info'

export interface NotificationData {
  message?: string
  type?: NotificationType
}

export interface NotificationParams<ComponentPropsType = any, ResolvingType = any> {
  escapeModal?: boolean
  resolver?: Subject<ResolvingType>
  injector?: Injector
  width?: string
  componentType?: 'notification' | 'dialog'
  component: Type<DialogComponent & ComponentPropsType> | Type<DialogComponent>
  componentOptions?: ComponentPropsType,
}
