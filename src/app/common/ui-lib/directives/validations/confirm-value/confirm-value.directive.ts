import {Directive, forwardRef, Input, OnChanges, SimpleChanges} from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from "@angular/forms";

/**
 * Checks if user input same as given confirmValue
 * (For example user Password confirmation etc)
 */
@Directive({
  selector: '[confirmValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ConfirmValueDirective),
      multi: true
    }
  ]
})
export class ConfirmValueDirective implements Validator, OnChanges {
  @Input() confirmValue?: string
  value?: string;

  onChangeFn = () => {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const {confirmValue} = this
    const value = control.value;
    if (confirmValue === value) {
      return null
    }
    return {confirmValue: true}
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChangeFn = fn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.onChangeFn) {
      this.onChangeFn()
    }
  }
}
