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
import {NotificationParams} from "../domain/notification";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Subject} from "rxjs";

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

describe('DialogModule works correctly', () => {
  let fixture: ComponentFixture<DialogsHosting>
  let logoutBtn: any
  let component: DialogsHosting
  let ds: DialogService

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
        DialogsHosting,
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: AppSettingsService, useClass: AppSettingsServiceForUnitTests},
        {provide: DialogService, useValue: ds},
      ],
      imports: [
        CommonModule,
        NoopAnimationsModule
      ],
    });
    fixture = TestBed.createComponent(DialogsHosting);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()
    logoutBtn = getByDataId(fixture, 'app-logout')
  });

  it(`Hosting component initializes correctly `, () => {
    expect(component).toBeDefined()
  })

  it(`Hosting component renders app-dialog-list component`, () => {
    expect(findComponent(fixture, 'app-dialog-list')).toBeDefined()
  })

  describe('DialogService store works correctly', () => {
    it('dialog list length is 0 by default', () => {
      expect(ds.dialogList$.getValue().length).toEqual(0)
    })

    it('removes dialogs from the store', () => {
      const n1: NotificationParams = {
        component: TestDialogComponent,
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

    it('Adds a modal window to the dom', () => {
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

  describe('DialogService renders dialog components correctly ', () => {

    it(`Render dialogs correctly`, () => {
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

    it(`Can spawn and close dialog wia DialogService`, () => {
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

  describe('addDialog method returns a controllable subject', () => {
    it(`Dialog closing programmatically with Subject.complete`, () => {
      const dialog$ = ds.addDialog({
        component: TestDialogComponent
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      dialog$.complete()
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
    })

    it('Dialog closing programmatically with Subject.next', () => {
      const dialog$ = ds.addDialog({
        component: TestDialogComponent
      })
      expect(ds.dialogList$.getValue().length).toEqual(1)
      dialog$.next('close with success')
      expect(ds.dialogList$.getValue().length).toEqual(0)
      expect(dialog$.isStopped).toBeTruthy()
    })

    it('Dialog closing with click', () => {
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

    it('Dialog closing with cancelEvent', () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let completeCaptured: boolean = false;
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

    it('Dialog closing with resolveEvent', () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let resultCaptured: boolean = false;
      dialog$.subscribe({
        next: result => resultCaptured = result
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

    it('Dialog closing with errorEvent', () => {
      const dialog$ = ds.addDialog({
        component: TestDialog2Component
      })
      let errorCaptured: any = undefined
      dialog$.subscribe({
        error: error => errorCaptured = error
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
  })
})
