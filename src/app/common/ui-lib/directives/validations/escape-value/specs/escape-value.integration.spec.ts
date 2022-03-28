import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {EscapeValueDirective} from "../escape-value.directive";
import {escapeValidatorTestCases} from "./escape-validator.cases";

@Component({
  template: `
    <form #form="ngForm">
      <input #pwd="ngModel" data-id="password"
             name="password"
             [escapeValue]="blacklist"
             [(ngModel)]="testInput"/>
    </form>
  `
})
export class EscapeValueHostingComponent {
  @ViewChild('form')
  form!: NgForm
  blacklist?: string[] = undefined
  testInput = ''
}

describe('Escape value directive works correctly', () => {
  let component: EscapeValueHostingComponent;
  let fixture: ComponentFixture<EscapeValueHostingComponent>;
  let testInput: any;

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
        EscapeValueHostingComponent,
        EscapeValueDirective
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
      imports: [
        CommonModule,
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(EscapeValueHostingComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges()
    testInput = getByDataId(fixture, 'password')
  });

  it('Поле для ввода присутствует', () => {
    expect(testInput).toBeDefined()
  })

  escapeValidatorTestCases.forEach(testCase =>{
    it(`Escape value integration ${testCase.descr}`, ()=>{
      component.blacklist = testCase.blacklist
      fixture.detectChanges()
      setInputValue(testInput, testCase.value)
      fixture.detectChanges()
      expect(component.form.valid).toEqual(!!testCase.formValid)
    })
  })

})
