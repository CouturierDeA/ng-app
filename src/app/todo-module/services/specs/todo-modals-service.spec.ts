import {TodoModalsService} from "../todo-modals.service";
import {TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UiModule} from "../../../common/ui-lib/ui.module";
import {ConfirmService} from "../../../common/ui-lib/dialog-module/services/confirm.service";
import {DialogService} from "../../../common/ui-lib/dialog-module/services/dialog.service";

describe('Todo modals service works correctly', () => {
  let modalsService: TodoModalsService;
  let dialogService: DialogService;
  let confirmService: ConfirmService;

  beforeEach(async () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        TodoModalsService,
        ConfirmService,
        DialogService
      ],
      imports: [
        CommonModule,
        FormsModule,
        UiModule,
      ],
    });
    modalsService = TestBed.inject(TodoModalsService)
    dialogService = TestBed.inject(DialogService)
    confirmService = TestBed.inject(ConfirmService)
  });

  it('expect service to be defined', () => {
    expect(modalsService).toBeDefined();
  });

  it('expect confirmDelete to not cause any errors', () => {
    modalsService.confirmDelete({
      title: 'Sure delete?'
    }).subscribe()
    expect().nothing()
  });

  it('expect addTodoModal to not cause any errors', () => {
    modalsService.addTodoModal().subscribe()
    expect().nothing()
  });

  it('expect updateTodoModal to not cause any errors', () => {
    modalsService.updateTodoModal({
      id: 1,
      title: 'Test 1',
      description: 'Test 1 description',
    }).subscribe()
    expect().nothing()
  });
})
