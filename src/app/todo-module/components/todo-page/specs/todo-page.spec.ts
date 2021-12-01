import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, getTestBed, tick} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {TodoPageComponent} from "../todo-page.component";
import {CommonModule} from "@angular/common";
import {RxTodoService} from "../../../rx-store/todo.service";
import {RxTodoStore} from "../../../rx-store/todo.store";
import {TodoService} from "../../../services/todo.service";
import {TodoFormComponent} from "../../todo-form/todo-form.component";
import {TodoListComponent} from "../../todo-list/todo-list.component";
import {
  getAddBtn,
  getItemsListFromFixture,
  getTitleInput,
  getDescriptionInput,
  setInputValue,
  getTodoSubmitBtn,
  getDeleteBtn,
  getUpdateBtn, getSearchInput
} from "../../todo-list/specs/utils";
import {TodoSearchComponent} from "../../todo-search/todo-search.component";
import {getTodoServiceMocks} from "./utils";
import {Todo} from "../../../domain/todo";

describe('Todo page Integration test ', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let service: Omit<TodoService, 'http'>
  let store: RxTodoStore
  let todoList: Todo[]

  beforeEach(async () => {
    const mocks = getTodoServiceMocks()
    service = mocks.service
    todoList = mocks.todoList
    store = new RxTodoStore()
    let TestBed = getTestBed()
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule
      ],
      declarations: [TodoPageComponent, TodoFormComponent, TodoListComponent, TodoSearchComponent],
      providers: [
        {provide: RxTodoStore, useValue: store},
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: TodoService, useValue: service},
        RxTodoService,
      ]
    });
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
  });

  describe('Renders todo list', () => {
    it('should display entire todo list', async () => {
      expect(fixture).toBeDefined();
      expect(getItemsListFromFixture(fixture)!.length).toEqual(todoList?.length);
    });
  })
  describe('Todo Page adds todo', () => {
    it('opens update form with newTodo equals to selectedTodoItem', fakeAsync(async () => {
      const newItem = {
        id: NaN,
        title: 'Test add new todo title',
        description: 'Test add new todo description'
      }
      let list = getItemsListFromFixture(fixture)
      expect(list!.some(item => {
        return (item.titleText === newItem.title) && (item.descriptionText === newItem.description)
      })).toBeFalsy()
      const btn = getAddBtn(fixture)
      btn.click()
      fixture.detectChanges()
      await fixture.whenStable()
      const titleInput = getTitleInput(fixture)
      const descriptionInput = getDescriptionInput(fixture)
      expect(titleInput).toBeDefined()
      expect(descriptionInput).toBeDefined()

      setInputValue(titleInput, newItem.title)
      setInputValue(descriptionInput, newItem.description)
      const submit = getTodoSubmitBtn(fixture)
      submit.click()
      fixture.detectChanges()
      list = getItemsListFromFixture(fixture)
      expect(list!.some(item => {
        return (item.titleText === newItem.title)
          && (item.descriptionText === newItem.description)
      })).toBeTruthy()
    }));
  })

  describe('Todo Page edits todo', () => {
    it('opens update form with newTodo equals to selectedTodoItem', fakeAsync(async () => {
      const updatingItemIndex = 1;
      let oldData = getItemsListFromFixture(fixture)![updatingItemIndex]
      expect(oldData).toBeDefined();
      const payload = {
        titleText: 'Test add new todo title',
        descriptionText: 'Test add new todo description'
      }
      const btn = getUpdateBtn(fixture, updatingItemIndex)
      btn.click()
      fixture.detectChanges()
      await fixture.whenStable()
      const titleInput = getTitleInput(fixture)
      const descriptionInput = getDescriptionInput(fixture)
      expect(titleInput).toBeDefined()
      expect(descriptionInput).toBeDefined()

      setInputValue(titleInput, payload.titleText)
      setInputValue(descriptionInput, payload.descriptionText)
      const submit = getTodoSubmitBtn(fixture)
      submit.click()
      fixture.detectChanges()
      let newData = getItemsListFromFixture(fixture)![updatingItemIndex]
      expect(newData).toEqual(payload);
    }));
  })

  describe('Todo Page deletes todo', () => {
    it('opens update form with newTodo equals to selectedTodoItem', fakeAsync(async () => {
      const deletingItemIndex = 1;
      let deleteCandidate = getItemsListFromFixture(fixture)![deletingItemIndex]
      expect(deleteCandidate).toBeDefined()
      const btn = getDeleteBtn(fixture, deletingItemIndex)
      btn.click()
      fixture.detectChanges()
      deleteCandidate = getItemsListFromFixture(fixture)![deletingItemIndex]
      expect(deleteCandidate).not.toBeDefined()
    }));
  })

  describe('Todo Page searches correctly todo list by title', () => {
    it('by the first element title', fakeAsync(() => {
      const searchValue = todoList[0].title
      const input = getSearchInput(fixture)
      input.value = searchValue;
      input.dispatchEvent(new Event('input'));
      tick(500)
      fixture.detectChanges();
      const list = getItemsListFromFixture(fixture)
      expect(list?.length).toEqual(1);
      expect(list![0].titleText).toEqual(searchValue);
    }));
    it('by the second element title', fakeAsync(() => {
      const searchValue = todoList[1].title
      const input = getSearchInput(fixture)
      input.value = searchValue;
      input.dispatchEvent(new Event('input'));
      tick(500)
      fixture.detectChanges();
      const list = getItemsListFromFixture(fixture)
      expect(list?.length).toEqual(1);
      expect(list![0].titleText).toEqual(searchValue);
    }));

    it('returns list state after input cleared', fakeAsync(() => {
      const searchValue = todoList[1].title
      const input = getSearchInput(fixture)
      input.value = searchValue;
      input.dispatchEvent(new Event('input'));
      tick(500)
      fixture.detectChanges();
      input.value = '';
      input.dispatchEvent(new Event('input'));
      tick(500)
      fixture.detectChanges();
      const list = getItemsListFromFixture(fixture)
      expect(list?.length).toEqual(2);
    }));
  })
})

