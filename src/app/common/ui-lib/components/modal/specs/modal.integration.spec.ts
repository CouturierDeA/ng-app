import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {
  AppSettingsService,
} from "../../../../services/app-settings/app-settings.service";
import {
  AppSettingsServiceForUnitTests
} from "../../../../services/app-settings/app-settings-for-unit-tests.service";
import {ModalComponent} from "../component/modal.component";
import {getByDataId} from "../../../../../test-utils/test-utils";

describe('DialogModule, его компоненты и сервисы работают корректно', () => {
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
        // DialogHosting,
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

  it(`Все элементы модального окна доступны по умолчанию`, () => {
    expect(modal).toBeDefined()
    expect(modalWrap).toBeDefined()
    expect(modalBackdrop).toBeDefined()
    expect(modalBody).toBeDefined()
  })

  it(`флаг opened - меняет класс closed `, () => {
    component.open()
    fixture.detectChanges()
    expect(modal.classList.toString()).not.toContain('closed')
    component.close()
    fixture.detectChanges()
    expect(modal.classList.toString()).toContain('closed')
  })

  it(`expect fixture to be defined`, () => {
    expect(fixture).toBeDefined()
  })

  it(`Окно !blocked по умолчанию`, () => {
    expect(component.blocked).toBeFalsy()
  })

  it(`При вызове close происходит closeEvent `, () => {
    const closeEventSpy = spyOn(component.closeEvent, 'emit')
    component.close()
    expect(closeEventSpy).toHaveBeenCalled()
  })

  it(`ngOnInit вызывает методы insert и open `, () => {
    const insertSpy = spyOn(component, 'insert')
    const openSpy = spyOn(component, 'open')
    component.ngOnInit()
    expect(insertSpy).toHaveBeenCalled()
    expect(openSpy).toHaveBeenCalled()
  })

  it(`ngOnDestroy вызывает метод remove`, () => {
    const removeSpy = spyOn(component, 'remove')
    component.ngOnDestroy()
    expect(removeSpy).toHaveBeenCalled()
  })

  it(`open выставляет opened в true`, () => {
    const spy = spyOn(component, 'open')
    component.open()
    expect(spy).toHaveBeenCalled()
  })

  it(`disable(...) меняет флаг blocked`, () => {
    component.disable(true);
    expect(component.isDisabled()).toBeTruthy()
    expect(component.blocked).toBeTruthy()
    component.disable(false);
    expect(component.isDisabled()).toBeFalsy()
    expect(component.blocked).toBeFalsy()
  })

  it(`isDisabled возвращает флаг blocked`, () => {
    component.blocked = true
    expect(component.isDisabled).toBeTruthy()
    component.blocked = false
    expect(component.isDisabled()).toBeFalsy()
  })

  it(`disable(...) -  меняет класс blocked `, () => {
    component.blocked = true;
    fixture.detectChanges()
    expect(modalWrap.classList.toString()).toContain('blocked')
    component.blocked = false;
    fixture.detectChanges()
    expect(modalWrap.classList.toString()).not.toContain('blocked')
  })

  it(`клик по overlay вызывает close`, () => {
    const spy = spyOn(component, 'close')
    modal.click()
    expect(spy).toHaveBeenCalled()
  })

  it(`клик по overlay не вызывает close если окно blocked`, () => {
    component.blocked = true;
    const spy = spyOn(component, 'close')
    modal.click()
    expect(spy).not.toHaveBeenCalled()
  })

  describe('Входные параметры меняют состояние окна', ()=>{
    it(`входной параметр width меняет ширину окна`, () => {
      component.width = "300px";
      fixture.detectChanges()
      expect(getComputedStyle(modalBody).width).toEqual(component.width)
    })

    it(`входной параметр componentType добавляет соответствующий класс `, () => {
      component.componentType = "notification";
      fixture.detectChanges()
      expect(modalWrap.classList.toString()).toContain('notification')

      component.componentType = "dialog";
      fixture.detectChanges()
      expect(modalWrap.classList.toString()).toContain('dialog')
    })

    it(`флаг overlayVisible - меняет класс visible`, () => {
      component.open()
      fixture.detectChanges()
      expect(modalBackdrop.classList.toString()).toContain('visible')
      component.overlayVisible = false
      fixture.detectChanges()
      expect(modalBackdrop.classList.toString()).not.toContain('visible')
    })
  })

})
