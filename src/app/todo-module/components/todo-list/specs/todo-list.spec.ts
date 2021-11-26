import {ComponentFixture, ComponentFixtureAutoDetect, TestBed} from "@angular/core/testing";
import {Todo} from "../../../domain/todo";
import {TodoListComponent} from "../todo-list.component";
import {BehaviorSubject} from "rxjs";
import {getDeleteBtn, getItemsListFromFixture, getUpdateBtn} from "./utils";

describe('TodoListComponent renders todo list correctly', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoList: Todo[] = [
    {
      id: 1,
      title: 'Test todo 1',
      description: 'Test todo 1 description',
    },
    {
      id: 2,
      title: 'Test todo 2',
      description: 'Test todo 2 description',
    }
  ]
  let todoList$ = new BehaviorSubject<Todo[]>([])

  beforeEach(() => {
    todoList$.next(todoList)
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todoList$ = todoList$
    fixture.detectChanges()
  });

  it('expect fixture to be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('should display entire todo list', () => {
    expect(fixture).toBeDefined();
    expect(getItemsListFromFixture(fixture)!.length).toEqual(todoList?.length);
  });

  it('should display todo items title and description', () => {
    getItemsListFromFixture(fixture)!.forEach((ti, index) => {
      const {titleText, descriptionText} = ti;
      expect(titleText).toEqual(`Test todo ${index + 1}`);
      expect(descriptionText).toEqual(`Test todo ${index + 1} description`);
    })
  });

  it('add new item cause component rerender', async () => {
    const newTodo: Todo = {
      id: 3,
      title: 'New todo 3',
      description: 'New todo 3 description'
    }
    todoList$.next([...todoList, newTodo])
    await fixture.detectChanges();
    let newTodoElements = getItemsListFromFixture(fixture)
    expect(newTodoElements?.length).toEqual(todoList.length + 1)
    let newTodoElement = getItemsListFromFixture(fixture)![2]
    expect(newTodoElement.titleText).toEqual(newTodo.title)
    expect(newTodoElement.descriptionText).toEqual(newTodo.description)
  });

  it('emits todo item to update after update btn click', async () => {
    spyOn(component.onUpdate, 'emit');
    const indexOfItem = 0
    const btn = getUpdateBtn(fixture, indexOfItem);
    btn.click()
    fixture.detectChanges();
    expect(component.onUpdate.emit).toHaveBeenCalledWith(todoList[indexOfItem]);
  });

  it('emits todo item to delete after delete btn click', async () => {
    spyOn(component.onDelete, 'emit');
    const indexOfItem = 1
    const btn = getDeleteBtn(fixture, indexOfItem);
    btn.click()
    // btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.onDelete.emit).toHaveBeenCalledWith(todoList[indexOfItem]);
  });

  it('expect controls to be enabled by default', async () => {
    expect(todoList.length > 0).toBeTruthy()
    for await (let item of todoList){
      fixture.detectChanges();
      await fixture.whenRenderingDone()
      const indexOfItem = todoList.indexOf(item)
      const delbtn = getDeleteBtn(fixture, indexOfItem);
      const updbtn = getUpdateBtn(fixture, indexOfItem);
      expect(delbtn.disabled).toBeFalsy()
      expect(updbtn.disabled).toBeFalsy()
    }
  });

  it('expect controls to be disabled', async () => {
    component.controlsDisabled = true;
    expect(todoList.length > 0).toBeTruthy()
    for await (let item of todoList){
      fixture.detectChanges();
      await fixture.whenRenderingDone()
      const indexOfItem = todoList.indexOf(item)
      const delbtn = getDeleteBtn(fixture, indexOfItem);
      const updbtn = getUpdateBtn(fixture, indexOfItem);
      expect(delbtn.disabled).toBeTruthy()
      expect(updbtn.disabled).toBeTruthy()
    }
  });
})
