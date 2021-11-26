import {Directive, forwardRef, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";

@Directive({
  selector: '[optionalRequired]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OptionalRequiredDirective),
      multi: true
    }
  ]
})
export class OptionalRequiredDirective implements Validator {
  innerRequired?: boolean;

  @Input('optionalRequired')
  get required(): any {
    return this.innerRequired;
  }

  set required(value: any) {
    this.innerRequired = value != null && value !== false && `${value}` !== 'false';
    if (this.onChangeFn) {
      setTimeout(this.onChangeFn, 0);
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChangeFn = fn;
  }

  validate(control: AbstractControl) {
    if (!this.innerRequired) {
      return null;
    }
    return Validators.required(control);
  }

  onChangeFn = () => {
  }

}
