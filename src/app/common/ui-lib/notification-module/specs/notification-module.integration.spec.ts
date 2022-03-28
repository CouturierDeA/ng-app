import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {AppSettingsService} from "../../../services/app-settings/app-settings.service";
import {AppSettingsServiceForUnitTests} from "../../../services/app-settings/app-settings-for-unit-tests.service";
import {Component} from "@angular/core";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  findComponent,
  findComponents,
  getByDataId,
  getByDataIdFromDebugElement
} from "../../../../test-utils/test-utils";

import {NotifyOptions} from "../services/notification.service";
import {NotificationListComponent} from "../components/notification-list/notification-list.component";
import {NotificationItemComponent} from "../components/notification-item/notification-item.component";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'NotificationHosting',
  template: `
    <app-notification-list></app-notification-list>
  `
})
class NotificationHosting {
}

describe('NotificationModule, его компоненты и сервисы работают корректно', () => {
  let fixture: ComponentFixture<NotificationHosting>
  let component: NotificationHosting
  let ns: NotificationService

  beforeEach(async () => {
    ns = new NotificationService();
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [
        NotificationListComponent,
        NotificationItemComponent,
        NotificationHosting
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: AppSettingsService, useClass: AppSettingsServiceForUnitTests},
        {provide: NotificationService, useValue: ns},
      ],
      imports: [
        CommonModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(NotificationHosting);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()
  });

  it(`Тестовый хостинг-компонент инициализируется `, () => {
    expect(component).toBeDefined()
  })

  it(`Тестовый хостинг-компонент рисует тестируемый app-notification-list `, () => {
    expect(findComponent(fixture, 'app-notification-list')).toBeDefined()
  })

  describe('NotificationServie работает корректно', () => {
    it(`по умолчанию store пустой `, () => {
      expect(ns.notificationList$.getValue().length).toEqual(0)
    })

    it(`удаляет нотификацию из store `, () => {
      const n1: NotifyOptions = {
        message: 'test notification message',
      }
      const n2: NotifyOptions = {
        message: 'test notification message'
      }
      ns.notify(n1)
      expect(ns.notificationList$.getValue().length).toEqual(1)
      ns.notify(n2)
      expect(ns.notificationList$.getValue().length).toEqual(2)
      ns.removeNotification(n1)
      expect(ns.notificationList$.getValue().length).toEqual(1)
      ns.removeNotification(n2)
      expect(ns.notificationList$.getValue().length).toEqual(0)
    })

    it(`добавляет нотификацию в dom `, fakeAsync(
      () => {
        const n1 = {
          message: 'message 1'
        }
        const n2 = {
          message: 'message 2'
        }
        ns.notify(n1)
        ns.notify(n2)
        fixture.detectChanges()
        let testDialog = findComponents(fixture, 'app-notification-item')
        expect(testDialog.length).toEqual(2)
        ns.removeNotification(n1)
        ns.removeNotification(n2)
        fixture.detectChanges()
        setTimeout(() => {
          testDialog = findComponents(fixture, 'app-notification-item')
          expect(testDialog.length).toEqual(0)
        }, 500)
        tick(500)
      }
    ))
  })

  describe('компонент, передаваемый в notify работает корректно', () => {

    it(`рендерит передаваемые входные параметры `, () => {
      let TEST_MESSAGE = 'TEST 1 2'
      ns.notify({
        message: TEST_MESSAGE,
      })
      fixture.detectChanges()
      const testDialogMessage = getByDataId(fixture, 'notification-message')
      expect((testDialogMessage as HTMLElement).innerText).toContain(TEST_MESSAGE)
    })

    it(`app-notification-item, отрендеренный через NotificationServie,
    имеет возможность закрыть самого себя`, fakeAsync(
      () => {
        ns.notify({
          message: 'test notification message'
        })
        tick(600)
        fixture.detectChanges()
        const testDialog = findComponent(fixture, 'app-notification-item')
        const testDialogCloseBtn = getByDataIdFromDebugElement(testDialog, 'close-notification')
        testDialogCloseBtn.click()
        tick(600)
        fixture.detectChanges()
        expect(findComponent(fixture, 'app-notification-item')).not.toBeDefined()
      }
    ))
  })

  it(`можно программно закрыть (успешно)`, () => {
    const dialog = ns.notify({
      message: 'test notification message'
    })
    expect(ns.notificationList$.getValue().length).toEqual(1)
    dialog()
    expect(ns.notificationList$.getValue().length).toEqual(0)
  })

  it(`Нотификация автоматически закрывается через lifeTime мили-секунд`, fakeAsync(
    () => {
      ns.notify({
        message: 'test notification message',
        lifeTime: 1000,
      })
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(1)
      tick(1001)
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(0)
    }
  ))
  it(`Нотификация автоматически закрывается через 5000 мили-секунд если lifeTime не передана`, fakeAsync(
    () => {
      ns.notify({
        message: 'test notification message',
      })
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(1)
      tick(5001)
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(0)
    }
  ))

  it(`Нотификация не закрывается автоматически через 100_000 мили-секунд если lifeTime = Infinity`, fakeAsync(
    () => {
      ns.notify({
        message: 'test notification message',
        lifeTime: Infinity
      })
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(1)
      tick(100_000) // с fakeAsync 100_000 пройдет примерно как 1мс
      fixture.detectChanges()
      expect(ns.notificationList$.getValue().length).toEqual(1)
    }
  ))

})
