import {ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, getTestBed, tick} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {TodoPageComponent} from "../todo-page.component";
import {CommonModule} from "@angular/common";
import {TodoCrudService} from "../../../services/todo-crud.service";
import {HttpTodoService} from "../../../services/http-todo.service";
import {TodoFormComponent} from "../../todo-form/todo-form.component";
import {TodoListComponent} from "../../todo-list/todo-list.component";
import {
  getAddBtn,
  getItemsListFromFixture,
  getDeleteBtn,
  getUpdateBtn, getSearchInput
} from "../../todo-list/specs/utils";
import {TodoSearchComponent} from "../../todo-search/todo-search.component";
import {Todo} from "../../../domain/todo";
import {TodoModalsService} from "../../../services/todo-modals.service";
import {MockPipeEffectsService} from "../../../../common/services/pipe-effects/mock-pipe-effects.service";
import {NotificationService} from "../../../../common/ui-lib/notification-module/services/notification.service";
import {ConfirmService} from "../../../../common/ui-lib/dialog-module/services/confirm.service";
import {of} from "rxjs";
import {DialogService} from "../../../../common/ui-lib/dialog-module/services/dialog.service";
import {PipeEffectsService} from "../../../../common/services/pipe-effects/pipe-effects.service";
import {UiModule} from "../../../../common/ui-lib/ui.module";
import {Subject} from "rxjs";
import {MockHttpTodoService} from "../../../services/mock-http-todo.service";
import {TodoStoreService} from "../../../services/todo-store.service";
import {CommonTodoStoreService} from "../../../services/common-todo-store.service";

describe('TodoCrudService integration with TodoPageComponent, TodoSearchComponent, TodoListComponent',
  () => {
    let component: TodoPageComponent;
    let fixture: ComponentFixture<TodoPageComponent>;
    let newItem: Todo;
    let todoList: Todo[];

    let modalService: TodoModalsService;
    let todoService: HttpTodoService;

    beforeEach(async () => {
      todoList = [
        {
          id: 1,
          title: 'Test 1',
          description: 'Test 1 d',
        },
        {
          id: 2,
          title: 'Test 2',
          description: 'Test 2 d',
        }
      ]
      newItem = {
        id: 0,
        title: 'Test add new todo title',
        description: 'Test add new todo description'
      }

      let TestBed = getTestBed()
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FormsModule,
          UiModule
        ],
        declarations: [TodoPageComponent, TodoFormComponent, TodoListComponent, TodoSearchComponent],
        providers: [
          {provide: ComponentFixtureAutoDetect, useValue: true},
          HttpTodoService,
          TodoModalsService,
          TodoCrudService,
          TodoStoreService,
          CommonTodoStoreService,
          NotificationService,
          {provide: PipeEffectsService, useClass: MockPipeEffectsService},
          {provide: HttpTodoService, useClass: MockHttpTodoService},
          {provide: 'mockTodoList', useValue: todoList},
          {provide: DialogService, useValue: {}},
          {provide: ConfirmService, useValue: {}},
        ]
      });
      modalService = TestBed.inject(TodoModalsService);
      todoService = TestBed.inject(HttpTodoService);
      fixture = TestBed.createComponent(TodoPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges()
    });

    it('Renders todo list', () => {
      expect(getItemsListFromFixture(fixture)!.length).toEqual(todoList?.length);
    });

    it('adds todo', fakeAsync(
      () => {
        spyOn(modalService, 'addTodoModal').and.returnValue(of({
          ...newItem,
          id: todoList.length + 1
        }) as Subject<Todo>)
        const btn = getAddBtn(fixture)
        btn.click()
        fixture.detectChanges()
        expect(getItemsListFromFixture(fixture)!.some(item => {
          return (item.titleText === newItem.title) && (item.descriptionText === newItem.description)
        })).toBeTruthy()
      }
    ));

    it('Edits todo', () => {
      const updatingItemIndex = 1;
      let oldData = getItemsListFromFixture(fixture)![updatingItemIndex]
      expect(oldData).toBeDefined();
      const payload = {
        id: todoList[updatingItemIndex].id,
        title: 'Test add new todo title',
        description: 'Test add new todo description'
      }
      spyOn(modalService, 'updateTodoModal').and.returnValue(of(payload) as Subject<Todo>)
      const btn = getUpdateBtn(fixture, updatingItemIndex)
      btn.click()
      fixture.detectChanges()
      let newData = getItemsListFromFixture(fixture)![updatingItemIndex]
      expect(newData).toEqual({
        titleText: payload.title,
        descriptionText: payload.description
      });
    });


    it('Todo Page deletes todo', () => {
      const deletingItemIndex = 1;
      spyOn(modalService, 'confirmDelete').and.returnValue(of(true) as Subject<boolean>);
      let deleteCandidate = getItemsListFromFixture(fixture)![deletingItemIndex]
      expect(deleteCandidate).toBeDefined()
      const btn = getDeleteBtn(fixture, deletingItemIndex)
      btn.click()
      fixture.detectChanges()
      deleteCandidate = getItemsListFromFixture(fixture)![deletingItemIndex]
      expect(deleteCandidate).not.toBeDefined()
    });

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

