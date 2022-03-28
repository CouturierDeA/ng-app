import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {DialogListComponent} from "../components/dialog-list/dialog-list.component";
import {NotificationComponent} from "../components/notification/notification.component";
import {RendererComponent} from "../components/renderer/renderer.component";
import {AppSettingsService} from "../../../services/app-settings/app-settings.service";
import {AppSettingsServiceForUnitTests} from "../../../services/app-settings/app-settings-for-unit-tests.service";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ModalComponent} from "../../components/modal/component/modal.component";
import {
  findComponent,
  findComponents,
  getByDataId,
  getByDataIdFromDebugElement
} from "../../../../test-utils/test-utils";
import {DialogService} from "../services/dialog.service";
import {DialogComponent} from "../../domain/dialog-component";
import {Subject} from "rxjs";
import {NotificationParams} from "../domain/notification";

@Component({
  selector: 'DialogsHosting',
  template: `
    <app-dialog-list></app-dialog-list>
  `
})
class DialogsHosting {

}

@Component({
  selector: 'TestDialog',
  template: `
    <div>
      <h3 data-id="test-dialog-message">{{message}}</h3>
      <button data-id="test-dialog-close" (click)="onClose()">Close test dialog</button>
    </div>`
})
class TestDialogComponent implements DialogComponent {
  @Input()
  resolver!: Subject<any>

  @Input()
  message?: string

  onClose() {
    this.resolver.complete()
  }
}

@Component({
  selector: 'test-dialog',
  template: `
    <div>
      test dialog
      <button data-id="test-dialog-resolve" (click)="resolveEvent.emit('okke')">resolve</button>
      <button data-id="test-dialog-error" (click)="errorEvent.emit('Error ')">error</button>
      <button data-id="test-dialog-close" (click)="cancelEvent.emit()">cancel</button>
    </div>
  `
})
export class TestDialog2Component implements DialogComponent<string> {
  @Output()
  resolveEvent = new EventEmitter<string>()
  @Output()
  errorEvent = new EventEmitter<Error | string>()
  @Output()
  cancelEvent = new EventEmitter<void>()
}

describe('DialogModule, его компоненты и сервисы работают корректно', () => {
  let fixture: ComponentFixture<DialogsHosting>
  let logoutBtn: any
  let component: DialogsHosting
  let ds: DialogService

  let findDialog = () => findComponent(fixture, 'testdialog')
  let findDialogs = () => findComponents(fixture, 'testdialog')

  beforeEach(async () => {
    ds = new DialogService();
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [
        DialogListComponent,
        NotificationComponent,
        RendererComponent,
        ModalComponent,
        TestDialogComponent,
        DialogsHosting
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: AppSettingsService, useClass: AppSettingsServiceForUnitTests},
        {provide: DialogService, useValue: ds},
      ],
      imports: [
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(DialogsHosting);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()
    logoutBtn = getByDataId(fixture, 'app-logout')
  });

  it(`Тестовый хостинг-компонент инициализируется `, () => {
    expect(component).toBeDefined()
  })

  it(`Тестовый хостинг-компонент рисует тестируемый dialoglist `, () => {
    expect(findComponent(fixture, 'app-dialog-list')).toBeDefined()
  })

  describe('DialogService работает корректно', () => {
    it(`по умолчанию store пустой `, () => {
      expect(ds.dialogList$.getValue().length).toEqual(0)
    })

    it(`удаляет модальное окно из store `, () => {
      const n1: NotificationParams = {
        component: TestDialogComponent,
        // renderComponent: (ref)=> ref.createComponent(TestDialogComponent)
      }
      const n2: NotificationParams = {
        component: TestDialogComponent
      }
      ds.addDialog(n1)
      expect(ds.dialogList$.getValue().length).toEqual(1)
      ds.addDialog(n2)
      expect(ds.dialogList$.getValue().length).toEqual(2)
      ds.removeDialog(n1.resolver!)
      expect(ds.dialogList$.getValue().length).toEqual(1)
      ds.removeDialog(n2.resolver!)
      expect(ds.dialogList$.getValue().length).toEqual(0)
    })

    it(`добавляет модальное окно в dom `, () => {
      const n1: NotificationParams = {
        component: TestDialogComponent
      }
      const n2: NotificationParams = {
        component: TestDialogComponent
      }
      ds.addDialog(n1)
      ds.addDialog(n2)
      fixture.detectChanges()
      expect(findDialogs().length).toEqual(2)
      ds.removeDialog(n1.resolver!)
      fixture.detectChanges()
      expect(findDialogs().length).toEqual(1)
      ds.removeDialog(n2.resolver!)
      fixture.detectChanges()
      expect(findDialogs().length).toEqual(0)
    })
  })

  describe('компонент, передаваемый в addDialog работает корректно', () => {

    it(`рендерит передаваемые входные параметры `, () => {
      let TEST_MESSAGE = 'TEST 1 2'
      ds.addDialog({
        component: TestDialogComponent,
        componentOptions: {
          message: TEST_MESSAGE
        }
      })
      fixture.detectChanges()
      const testDialogMessage = getByDataIdFromDebugElement(findComponent(fixture, 'testdialog'), 'test-dialog-message')
      expect((testDialogMessage as HTMLElement).innerText).toContain(TEST_MESSAGE)
    })

    it(`TestDialog, отрендеренный через DialogService,
    имеет возможность закрыть самого себя через resolver`, () => {
      ds.addDialog({
        component: TestDialogComponent
      })
      fixture.detectChanges()
      const testDialog = findComponent(fixture, 'testdialog')
      const testDialogCloseBtn = getByDataIdFromDebugElement(testDialog, 'test-dialog-close')
      testDialogCloseBtn.click()
      fixture.detectChanges()
      expect(findComponent(fixture, 'testdialog')).not.toBeDefined()
    })
  })

  describe('addDialog возвращает Subject, с помощью которого можно: ', () => {
    it(`программно закрыть (отменить) dialog (Subject.complete)`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialogComponent
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      dialog$.complete()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
    })

    it(`программно закрыть (успешно) dialog Subject.next`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialogComponent
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      dialog$.next('close with success')
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
    })

    it(`закрыть (cancel) dialog кликом на backdrop модального окна`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialogComponent
      })
      fixture.detectChanges()
      const modal = findComponent(fixture, 'app-modal')
      const appModal = getByDataIdFromDebugElement(modal, 'app-modal')
      appModal.click()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
    })

    it(`По cancelEvent диалог закрывается`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let completeCaptured: any
      dialog$.subscribe({
        complete: () => completeCaptured = true
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      fixture.detectChanges()
      const modal = findComponent(fixture, 'app-modal')
      const closeBtn = getByDataIdFromDebugElement(modal, 'test-dialog-close')
      closeBtn.click()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
      expect(completeCaptured).toBeTruthy()
    })

    it(`По resolveEvent диалог закрывается с next`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let resultCaptured: any
      dialog$.subscribe({
        next: r => resultCaptured = r
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      fixture.detectChanges()
      const modal = findComponent(fixture, 'app-modal')
      const closeBtn = getByDataIdFromDebugElement(modal, 'test-dialog-resolve')
      closeBtn.click()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
      expect(resultCaptured).toBeTruthy()
    })

    it(`По errorEvent диалог закрывается с error`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let errorCaptured: any
      dialog$.subscribe({
        error: r => errorCaptured = r
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      fixture.detectChanges()
      const modal = findComponent(fixture, 'app-modal')
      const closeBtn = getByDataIdFromDebugElement(modal, 'test-dialog-error')
      closeBtn.click()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
      expect(errorCaptured).toBeTruthy()
    })

    // Todo - разобраться как протестировать:  dialog$.error иногда при запуске теста(наверное 1 из 30 раз)
    //  валит тесты с ошибкой из-за unhandled promise rejection
    // it(`имеет возможность программно закрыть (с ошибкой) dialog`, () => {
    //   const dialog$ = ds.addDialog({
    //     component: TestDialogComponent
    //   })
    //   expect(ds.dialogList$.getValue().length).toEqual(1)
    //   dialog$.error('close Dialog with some test error')
    //   expect(ds.dialogList$.getValue().length).toEqual(0)
    //   expect(dialog$.isStopped).toBeTruthy()
    // })
  })

})
