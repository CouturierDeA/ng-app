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

  it('There are two input fields', () => {
    expect(pwdInput).toBeDefined()
    expect(confirmPwdInput).toBeDefined()
  })

  it('Fields are filled unequally unequal - invalid form', () => {
    setInputValue(pwdInput, '12')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.invalid).toBeTruthy()
  })

  it('The first field is empty, the second is filled - the form is invalid', () => {
    setInputValue(pwdInput, '')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.invalid).toBeTruthy()
  })

  it('the first field is filled, the second is empty - the form is invalid', () => {
    setInputValue(pwdInput, '123')
    setInputValue(confirmPwdInput, '')
    expect(component.form.invalid).toBeTruthy()
  })

  it('The form is valid if both fields are empty', () => {
    setInputValue(pwdInput, '')
    setInputValue(confirmPwdInput, '')
    expect(component.form.valid).toBeTruthy()
  })

  it('If value and confirmValue are the same, the form is valid', () => {
    setInputValue(pwdInput, '123')
    setInputValue(confirmPwdInput, '123')
    expect(component.form.valid).toBeTruthy()
  })
})
