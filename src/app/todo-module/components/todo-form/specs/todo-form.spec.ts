import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {Todo} from "../../../domain/todo";
import {TodoFormComponent} from "../todo-form.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {getDescriptionInput, getTitleInput, getTodoSubmitBtn, setInputValue} from "../../todo-list/specs/utils";
import {UniqueValueDirective} from "../../../directives/validations/unique.directive";
import {HttpTodoService} from "../../../services/http-todo.service";
import {PipeEffectsService} from "../../../../common/services/pipe-effects/pipe-effects.service";
import {MockPipeEffectsService} from "../../../../common/services/pipe-effects/mock-pipe-effects.service";
import {UiModule} from "../../../../common/ui-lib/ui.module";
import {MockHttpTodoService} from "../../../services/mock-http-todo.service";

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
        {provide: HttpTodoService, useClass: MockHttpTodoService},
        {provide: PipeEffectsService, useClass: MockPipeEffectsService},
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
    const submitButton = getTodoSubmitBtn(fixture);
    expect(submitButton).toBeDefined()
  });

  it('expect title input toBeDefined', async () => {
    await fixture.whenStable()
    const titleInput = getTitleInput(fixture)
    expect(titleInput).toBeDefined()
  });

  it('expect description input toBeDefined', async () => {
    await fixture.whenStable()
    const descriptionInput = getDescriptionInput(fixture)
    expect(descriptionInput).toBeDefined()
  });


  it('Emits new or updated item after user input and submit', fakeAsync(async () => {
    spyOn(component.resolveEvent, 'emit');
    component.todo = newTodo
    fixture.detectChanges();
    await fixture.whenStable()
    const newDescription = 'Test new todo description'
    const descriptionInput = getDescriptionInput(fixture)
    setInputValue(descriptionInput, newDescription)
    tick(1000)

    const newTitle = 'Test new todo title'
    const titleInput = getTitleInput(fixture)
    setInputValue(titleInput, newTitle)
    tick(1000)

    const btn = getTodoSubmitBtn(fixture);
    expect(btn).toBeDefined()
    expect(component.updateForm.invalid).toBeFalsy()
    expect(btn.disabled).toBeFalsy()
    btn.click()
    tick(1000)
    expect(component.resolveEvent.emit).toHaveBeenCalledWith({
      id: newTodo.id,
      title: newTitle,
      description: newDescription,
    });
  }));
})
