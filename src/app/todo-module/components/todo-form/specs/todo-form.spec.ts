import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {Todo} from "../../../domain/todo";
import {TodoFormComponent} from "../todo-form.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {getDescriptionInput, getTitleInput, getTodoSubmitBtn, setInputValue} from "../../todo-list/specs/utils";
import {UniqueValueDirective} from "../../../directives/validations/unique.directive";
import {HttpTodoService} from "../../../services/http-todo.service";
import {UiEffectsService} from "../../../../common/services/ui-effects/ui-effects.service";
import {UiEffectsServiceForTesting} from "../../../../common/services/ui-effects/ui-effects-testing.service";
import {of} from "rxjs";
import {UiModule} from "../../../../common/ui-lib/ui.module";

describe('Todo form tests', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let newTodo: Todo
  let updateTodo: Todo

  beforeEach(async () => {
    newTodo = {
      id: NaN,
      title: '',
      description: ''
    }
    updateTodo = {
      id: 1,
      title: 'Test todo 1',
      description: 'Test todo 1 description',
    }
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent, UniqueValueDirective],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {
          provide: HttpTodoService, useValue: {
            checkUnique(value: string, fieldName: string, entityId?: number) {
              return of(true)
            }
          }
        },
        {provide: UiEffectsService, useClass: UiEffectsServiceForTesting},
      ],
      imports: [
        CommonModule,
        FormsModule,
        UiModule,
      ],
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('expect fixture to be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('expect fixture to be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('expect TodoSubmitBtn toBeDefined', async () => {
    component.todo = newTodo
    fixture.detectChanges();
    let btn = getTodoSubmitBtn(fixture);
    expect(btn).toBeDefined()
  });

  it('expect title input toBeDefined', async () => {
    await fixture.whenStable()
    const t = getTitleInput(fixture)
    expect(t).toBeDefined()
  });

  it('expect description input toBeDefined', async () => {
    await fixture.whenStable()
    const d = getDescriptionInput(fixture)
    expect(d).toBeDefined()
  });


  it('Emits new or updated item after user input and submit', fakeAsync(async () => {
    spyOn(component.resolveEvent, 'emit');
    component.todo = newTodo
    fixture.detectChanges();
    await fixture.whenStable()
    const dt = 'Test new todo description'
    const descriptionInput = getDescriptionInput(fixture)
    setInputValue(descriptionInput, dt)
    tick(1000)

    const tt = 'Test new todo title'
    const titleInput = getTitleInput(fixture)
    setInputValue(titleInput, tt)
    tick(1000)

    const btn = getTodoSubmitBtn(fixture);
    expect(btn).toBeDefined()
    expect(component.updateForm.invalid).toBeFalsy()
    expect(btn.disabled).toBeFalsy()
    btn.click()
    tick(1000)
    expect(component.resolveEvent.emit).toHaveBeenCalledWith({
      id: newTodo.id,
      title: tt,
      description: dt,
    });
  }));
})
