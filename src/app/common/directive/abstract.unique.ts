import {Directive, Input} from "@angular/core";
import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";

// https://jasonwatmore.com/post/2018/11/10/angular-7-template-driven-forms-validation-example

/**
 * abstract directive to check any field is unique
 */
@Directive({})
export abstract class UniqueDirective implements Validator {

  checker(value: any, control: AbstractControl): Observable<boolean> {
    throw 'Unsupported yet'
  }

  @Input() uniqueValue!: {
    debounce?: number,
    required?: boolean
    entityId?: number,
    fieldName: string
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
