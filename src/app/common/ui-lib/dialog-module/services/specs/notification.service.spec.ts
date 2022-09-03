import {NotificationService} from "../../../notification-module/services/notification.service";

describe('NotificationService works correctly', () => {
  it('NotificationService initializes correctly', () => {
    const ns = new NotificationService()
    expect(ns).toBeDefined()
  })
})
