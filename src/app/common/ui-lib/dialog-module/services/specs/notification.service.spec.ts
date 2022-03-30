import {NotificationService} from "../../../notification-module/services/notification.service";
import {Subject} from "rxjs";
import {DialogService} from "../dialog.service";
import {NotificationParams} from "../../domain/notification";

describe('NotificationService работает корректно', () => {
  it('', () => {
    const ds = {
      addDialog: (options: NotificationParams)=> new Subject()
    } as unknown as DialogService
    const ns = new NotificationService()
    expect(ns).toBeDefined()
  })
})
