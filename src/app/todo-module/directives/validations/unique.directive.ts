import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_ASYNC_VALIDATORS, Validator} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {UniqueDirective} from "../../../common/directive/abstract.unique";

// https://jasonwatmore.com/post/2018/11/10/angular-7-template-driven-forms-validation-example

@Directive({
  selector: '[uniqueValue]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueValueDirective),
      multi: true
    }
  ]
})
export class UniqueValueDirective extends UniqueDirective implements Validator {
  constructor(
    private todoService: TodoService
  ) {
    super()
  }

  checker(value: string, control: AbstractControl) {
    return this.todoService.checkUnique(value, this.uniqueValue.fieldName, this.uniqueValue.entityId)
  }
}
