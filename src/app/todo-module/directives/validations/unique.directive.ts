import {Directive, forwardRef} from "@angular/core";
import {AbstractControl, NG_ASYNC_VALIDATORS, Validator} from "@angular/forms";
import {HttpTodoService} from "../../services/http-todo.service";
import {UniqueDirective} from "../../../common/directive/abstract.unique";
import {PipeEffectsService} from "../../../common/services/pipe-effects/pipe-effects.service";

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
    private pes: PipeEffectsService,
  ) {
    super()
  }

  checker(value: string, control: AbstractControl) {
    return this.todoService.checkUnique(value, this.uniqueValue.fieldName, this.uniqueValue.entityId).pipe(
      this.pes.withErrorNotification()
    )
  }
}
