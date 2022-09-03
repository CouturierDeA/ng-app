import {
  Component, ContentChild, EventEmitter, HostListener, Input, Optional, Output, Self, TemplateRef,
} from '@angular/core';
import {
  ControlValueAccessor, NgControl, NgForm
} from "@angular/forms";

const noop = () => {
};

/**
 * Abstract implementation of ControlValueAccessor
 * useful to create customizable NgControl
 */

@Component({
  template: ''
})
export abstract class AbstractControlValueAccessorComponent implements ControlValueAccessor {
  constructor(
    @Self() @Optional() public control: NgControl,
    @Optional() public controlContainer: NgForm,
  ) {
    if (control) {
      control.valueAccessor = this;
    }
  }

  @Input('name') formName?: string;
  @Output() onStateChange = new EventEmitter();
  @ContentChild('errorTemplate')
  errorTemplateRef: TemplateRef<any> | null = null;
  protected innerValue: any = '';
  protected onTouchedCallback: ($event: Event) => void = noop;
  protected onChangeCallback: (_: any) => void = noop;
  disabled:boolean = false;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    this.setValue(v);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValue(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur($event: Event) {
    this.onTouchedCallback($event);
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}


