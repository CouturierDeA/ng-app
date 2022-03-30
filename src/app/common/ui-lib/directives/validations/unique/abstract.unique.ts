import {Directive, Input} from "@angular/core";
import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";

/**
 * Abstract validator that checks if user input is unique.
 * You need to extend this class and implement "checker" method that accepts value and returns Observable boolean flag
 * if the value is unique or not
 * @param uniqueValue: Object - you can provide debounce time for user input, if validation required or not;
 *
 */
@Directive({})
export abstract class UniqueDirective implements Validator {

  checker(value: any, control: AbstractControl): Observable<boolean> {
    throw 'Unsupported yet'
  }

  @Input() uniqueValue!: {
    debounce?: number,
    required?: boolean
  };

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const uniqueValue = this.uniqueValue || {
      required: false, debounce: undefined
    }
    const {required, debounce} = uniqueValue
    return control.valueChanges
      .pipe(
        debounceTime(debounce || 500),
        distinctUntilChanged(),
        switchMap(value => required ? this.checker(value, control) : of(false)),
        map((isUnique: boolean) => isUnique ? null : {uniqueValue: true}),
        first()
      );
  }
}
