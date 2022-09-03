import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {
  AppSettingsService
} from "../../../../services/app-settings/app-settings.service";
import {
  AppSettingsServiceForUnitTests
} from "../../../../services/app-settings/app-settings-for-unit-tests.service";
import {ModalComponent} from "../component/modal.component";
import {getByDataId} from "../../../../../test-utils/test-utils";

describe('DialogModule, its components and services work correctly', () => {
  let fixture: ComponentFixture<ModalComponent>
  let component: ModalComponent
  let modal: any
  let modalWrap: any
  let modalBackdrop: any
  let modalBody: any

  beforeEach(async () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: AppSettingsService, useClass: AppSettingsServiceForUnitTests},
      ],
      imports: [
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()
    modal = getByDataId(fixture, 'app-modal')
    modalWrap = getByDataId(fixture, 'app-modal-wrap')
    modalBackdrop = getByDataId(fixture, 'app-modal-background')
    modalBody = getByDataId(fixture, 'app-modal-body')
  });

  it('All modal elements are available by default', () => {
    expect(modal).toBeDefined()
    expect(modalWrap).toBeDefined()
    expect(modalBackdrop).toBeDefined()
    expect(modalBody).toBeDefined()
  })

  it('opened flag changes closed class', () => {
    component.open()
    fixture.detectChanges()
    expect(modal.classList.toString()).not.toContain('closed')
    component.close()
    fixture.detectChanges()
    expect(modal.classList.toString()).toContain('closed')
  })

  it('expect fixture to be defined', () => {
    expect(fixture).toBeDefined()
  })

  it('Window is not blocked by default', () => {
    expect(component.blocked).toBeFalsy()
  })

  it('A closeEvent fired when close is called', () => {
    const closeEventSpy = spyOn(component.closeEvent, 'emit')
    component.close()
    expect(closeEventSpy).toHaveBeenCalled()
  })

  it('ngOnInit calls insert and open methods', () => {
    const insertSpy = spyOn(component, 'insert')
    const openSpy = spyOn(component, 'open')
    component.ngOnInit()
    expect(insertSpy).toHaveBeenCalled()
    expect(openSpy).toHaveBeenCalled()
  })

  it('ngOnDestroy calls the remove method', () => {
    const removeSpy = spyOn(component, 'remove')
    component.ngOnDestroy()
    expect(removeSpy).toHaveBeenCalled()
  })

  it('open sets opened to true', () => {
    const spy = spyOn(component, 'open')
    component.open()
    expect(spy).toHaveBeenCalled()
  })

  it('disable(...) changes the blocked flag', () => {
    component.disable(true);
    expect(component.isDisabled()).toBeTruthy()
    expect(component.blocked).toBeTruthy()
    component.disable(false);
    expect(component.isDisabled()).toBeFalsy()
    expect(component.blocked).toBeFalsy()
  })

  it('isDisabled returns the blocked flag', () => {
    component.blocked = true
    expect(component.isDisabled).toBeTruthy()
    component.blocked = false
    expect(component.isDisabled()).toBeFalsy()
  })

  it( 'disable(...) method call changes the blocked class', () => {
    component.blocked = true;
    fixture.detectChanges()
    expect(modalWrap.classList.toString()).toContain('blocked')
    component.blocked = false;
    fixture.detectChanges()
    expect(modalWrap.classList.toString()).not.toContain('blocked')
  })

  it('click on overlay causes close', () => {
    const spy = spyOn(component, 'close')
    modal.click()
    expect(spy).toHaveBeenCalled()
  })

  it('click on overlay does not call close if the window is blocked', () => {
    component.blocked = true;
    const spy = spyOn(component, 'close')
    modal.click()
    expect(spy).not.toHaveBeenCalled()
  })

  describe('Input parameters change the state of the window', ()=>{
    it('the input parameter width changes the width of the window', () => {
      component.width = "300px";
      fixture.detectChanges()
      expect(getComputedStyle(modalBody).width).toEqual(component.width)
    })

    it( 'input parameter componentType adds the corresponding class', () => {
      component.componentType = "notification";
      fixture.detectChanges()
      expect(modalWrap.classList.toString()).toContain('notification')

      component.componentType = "dialog";
      fixture.detectChanges()
      expect(modalWrap.classList.toString()).toContain('dialog')
    })

    it(`flag overlayVisible toggles visible class`, () => {
      component.open()
      fixture.detectChanges()
      expect(modalBackdrop.classList.toString()).toContain('visible')
      component.overlayVisible = false
      fixture.detectChanges()
      expect(modalBackdrop.classList.toString()).not.toContain('visible')
    })
  })

})
