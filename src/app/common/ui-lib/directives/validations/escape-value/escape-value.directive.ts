import {Directive, forwardRef, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
export const escapeValidator = (blacklist?: string[], value?: any) => {
  if (!blacklist || blacklist.every(v => v !== value)) {
    return null
  } else {
    return {escapeValue: true}
  }
}
/**
 * Директива для проверки пользовательского ввода
 * проверяет, что пользователь не ввел одно из существующих значений
 */
@Directive({
  selector: '[escapeValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EscapeValueDirective),
      multi: true
    }
  ]
})
export class EscapeValueDirective implements Validator {
  @Input() escapeValue?: string[]

  escapeValidator = escapeValidator

  validate(control: AbstractControl): ValidationErrors | null {
    return this.escapeValidator(this.escapeValue, control.value)
  }
}


