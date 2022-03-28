import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_ASYNC_VALIDATORS, Validator} from "@angular/forms";
import {HttpTodoService} from "../../services/http-todo.service";
import {UniqueDirective} from "../../../common/directive/abstract.unique";
import {UiEffectsService} from "../../../common/services/ui-effects/ui-effects.service";

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
    private todoService: HttpTodoService,
    private ues: UiEffectsService,
  ) {
    super()
  }

  checker(value: string, control: AbstractControl) {
    return this.todoService.checkUnique(value, this.uniqueValue.fieldName, this.uniqueValue.entityId).pipe(
      this.ues.withErrorNotification()
    )
  }
}
