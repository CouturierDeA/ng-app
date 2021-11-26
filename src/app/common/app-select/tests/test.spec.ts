// https://github.com/codecraft-tv/angular-course/blob/current/13.unit-testing/11.model-driven-forms/code/app/login.component.spec.ts
// https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/
// https://codecraft.tv/courses/angular/unit-testing/change-detection/
import {AppSelectComponent} from "../app-select.component";
import {TestHostComponent} from "./test-host-component/test-host.component";
import {ComponentFixture, getTestBed} from "@angular/core/testing";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

describe('AppSelect tests', () => {

  const optionList = [
    {
      id: null,
      label: 'unset'
    },
    {
      id: 1,
      label: 'small'
    },
    {
      id: 2,
      label: 'medium'
    },
    {
      id: 3,
      label: 'large'
    }
  ];
  const selectName = 'size';

  const getSetup = (options: {
    selectName: string | undefined,
    optionList: typeof optionList,
    requiredCheck: boolean
  }) => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let selectValue: HTMLInputElement;
    let TestBed = getTestBed()
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AppSelectComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    component.selectName = options.selectName;
    component.optionList = options.optionList;
    component.requiredCheck = options.requiredCheck;
    selectValue = fixture.nativeElement.querySelector('.up-select-name');
    fixture.autoDetectChanges();
    return {
      component, fixture, selectValue
    };
  };

  describe('AppSelect renders correctly', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let selectValue: HTMLInputElement;
    beforeEach(() => {
      let setup = getSetup({
        selectName,
        optionList,
        requiredCheck: true
      });
      component = setup.component;
      fixture = setup.fixture;
      selectValue = setup.selectValue;
    });

    it('should render options list', () => {
      let options = fixture.nativeElement.querySelectorAll('.up-select-option');
      expect(options.length).toEqual(component?.optionList?.length);
    });

    it('should render default select option template', () => {
      let optionsDefault = fixture.nativeElement.querySelectorAll('.up-select-option .default');
      let optiosCustom = fixture.nativeElement.querySelectorAll('.test-custom-select-option');
      expect(optiosCustom.length).toEqual(0);
      optionList.forEach((size, index) => {
        expect(optionsDefault[index].textContent).toEqual(size.label);
      });
    });

    it('should render custom select option template', async () => {
      component.useCustomOptionTemplate = true;
      await fixture.whenRenderingDone();
      let optionsDefault = fixture.nativeElement.querySelectorAll('.up-select-option .default');
      let optios = fixture.nativeElement.querySelectorAll('.test-custom-select-option');
      expect(optionsDefault.length).toEqual(0);
      expect(optios.length).toEqual(optionList.length);
      optionList.forEach((size, index) => {
        expect(optios[index]).toBeDefined();
        expect(optios[index].textContent).toEqual(`${size.label} ${size.id === null ? '' : size.id}`);
      });
    });

    it('should render no selection option', async () => {
      await fixture.whenRenderingDone();
      expect(selectValue.placeholder).toEqual(component!.optionList![0].label);
    });
  });

  describe('AppSelect Handles "required" validation correctly when required flag is true', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let selectValue: HTMLInputElement;
    beforeEach(() => {
      let setup = getSetup({
        selectName,
        optionList,
        requiredCheck: true
      });
      component = setup.component;
      fixture = setup.fixture;
      selectValue = setup.selectValue;
    });

    it('should have required error when required', async () => {
      await fixture.whenRenderingDone();
      expect(component!.form!.valid).toBeFalsy();
      const ctrl = component!.form!.controls[selectName];
      expect(ctrl!.errors!['required']).toBeTruthy();
    });

    it('should render custom required error', async () => {
      component.useCustomErrorTemplate = true;
      await fixture.whenRenderingDone();
      expect(component!.form!.valid).toBeFalsy();
      let size = component!.form!.controls[selectName];
      expect(size!.errors!['required']).toBeTruthy();
      let errors = fixture.nativeElement.querySelector('.up-select-errors');
      expect(errors.innerText).toContain('Size is very required');
    });
  });

  describe('AppSelect Handles "required" validation correctly when required flag is false', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let selectValue: HTMLInputElement;
    beforeEach(() => {
      let setup = getSetup({
        selectName,
        optionList,
        requiredCheck: false
      });
      component = setup.component;
      fixture = setup.fixture;
      selectValue = setup.selectValue;
    });

    it('should not have required error when not required', async () => {
      await fixture.detectChanges();
      expect(component!.form!.valid).toBeTruthy();
      let errorsBlock = fixture.nativeElement.querySelector('.up-select-errors');
      expect(errorsBlock).toEqual(null);
    });
  });

  describe('AppSelect interacts with user correctly:', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let selectValue: HTMLInputElement;
    beforeEach(() => {
      let setup = getSetup({
        selectName,
        optionList,
        requiredCheck: true
      });
      component = setup.component;
      fixture = setup.fixture;
      selectValue = setup.selectValue;
    });

    it('should select an option and render selected name', async () => {
      await fixture.whenRenderingDone();
      let options = fixture.nativeElement.querySelectorAll('.up-select-option');
      let selectedOption = 2;
      options[selectedOption].click();
      expect(selectValue.placeholder).toEqual(component!.optionList![selectedOption].label);
    });
  });

})
