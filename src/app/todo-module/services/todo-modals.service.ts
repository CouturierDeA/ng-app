import {Injectable, Injector} from '@angular/core';
import {Todo} from "../domain/todo";
import {TodoFormComponent, TodoFormComponentProps} from "../components/todo-form/todo-form.component";
import {DialogService} from "../../common/ui-lib/dialog-module/services/dialog.service";
import {ConfirmOptionsType, ConfirmService} from "../../common/ui-lib/dialog-module/services/confirm.service";

@Injectable()
export class TodoModalsService {
  constructor(
    private cs: ConfirmService,
    public ds: DialogService,
    private injector: Injector,
  ) {
  }

  confirmDelete(options: ConfirmOptionsType){
    return this.cs.confirm(options)
  }

  updateTodoModal(todo: Todo) {
    return this.ds.addDialog<TodoFormComponentProps, Todo>({
      injector: this.injector,
      component: TodoFormComponent,
      componentOptions: {
        formTitle: 'Update todo',
        todo: {
          ...todo
        }
      }
    })
  }

  addTodoModal() {
    return this.ds.addDialog<TodoFormComponentProps, Todo>({
      injector: this.injector,
      component: TodoFormComponent,
      componentOptions: {
        formTitle: 'Add new todo'
      }
    })
  }
}
