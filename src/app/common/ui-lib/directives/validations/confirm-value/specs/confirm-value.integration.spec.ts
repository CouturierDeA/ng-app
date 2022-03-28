import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {ConfirmValueDirective} from "../confirm-value.directive";

@Component({
  template: `
    <form #form="ngForm">
      <input #pwd="ngModel" data-id="password"
             name="password"
             [(ngModel)]="password"/>
      <input #pwdC="ngModel" data-id="password-confirm"
             name="password-confirm"
             [confirmValue]="password"
             [(ngModel)]="passwordConfirm"/>
    </form>
  `
})
export class ConfirmValueHostingComponent {
  @ViewChild('form')
  form!: NgForm
  password = ''
  passwordConfirm = ''
}

describe('Confirm value directive works correctly', () => {
  let component: ConfirmValueHostingComponent;
  let fixture: ComponentFixture<ConfirmValueHostingComponent>;
  let pwdInput: any;
  let confirmPwdInput: any

  const getByDataId = <T>(fixture: ComponentFixture<T>, dataId: string) => {
    return fixture.nativeElement.querySelector(`[data-id="${dataId}"]`) || undefined
  }
  const setInputValue = (input: HTMLInputElement, value: any) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));

  }
  beforeEach(async () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [
        ConfirmValueHostingComponent,
        ConfirmValueDirective
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
      imports: [
        CommonModule,
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(ConfirmValueHostingComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()

    pwdInput = getByDataId(fixture, 'password')
    confirmPwdInput = getByDataId(fixture, 'password-confirm')
  });

  it('Два поля для ввода присутствуют', () => {
    expect(pwdInput).toBeDefined()
    expect(confirmPwdInput).toBeDefined()
  })

  it(`Поля заполнены неодинаково неодинаковы - форма invalid`, () => {
    setInputValue(pwdInput, '12')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.invalid).toBeTruthy()
  })

  it(`первое поле пустое, второе заполнено - форма invalid`, () => {
    setInputValue(pwdInput, '')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.invalid).toBeTruthy()
  })

  it(`первое поле заполнено, второе пустое - форма invalid`, () => {
    setInputValue(pwdInput, '123')
    setInputValue(confirmPwdInput, '')
    expect(component.form.invalid).toBeTruthy()
  })

  it(`оба поля пустые - форма valid`, () => {
    setInputValue(pwdInput, '')
    setInputValue(confirmPwdInput, '')
    expect(component.form.valid).toBeTruthy()
  })

  it(`Если value и confirmValue одинаковы, форма valid`, () => {
    setInputValue(pwdInput, '123')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.valid).toBeTruthy()
  })


})
