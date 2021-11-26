import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../../domain/todo";
import {RxTodoService} from "../../rx-store/todo.service";
import {RxTodoStore} from "../../rx-store/todo.store";
import {BehaviorSubject, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'TodoPageRx',
  templateUrl: './todo-page.component.html'
})
export class TodoPageComponent implements OnInit, OnDestroy {
  constructor(
    private todoService: RxTodoService,
    private todoStore: RxTodoStore
  ) {
  }

  newTodo?: Todo
  isUpdateActivated = false
  isAddActivated = false
  search$ = new BehaviorSubject('')

  todoList$ = this.todoStore.entities$.pipe(
    switchMap((todoList) => {
      return this.search$.pipe(
        map(value => todoList.filter(todo => value ? todo.title.includes(value) : todo))
      )
    })
  )

  ngOnInit() {
    this.readTodoList();
    // this.subs = [
    //   this.todoStore.entities$.subscribe(()=>{
    //     console.error('test 12 ')
    //   }),
    //   this.todoStore.entities$.subscribe(()=>{
    //     console.error('test 12 ')
    //   })
    // ]
  }
  subs: Subscription[] = []
  ngOnDestroy() {
    this.subs.forEach(sub=> sub.unsubscribe())
  }

  readTodoList = () => {
    this.todoService.readTodoList().toPromise()
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).toPromise()
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo.id, todo).toPromise();
    this.isUpdateActivated = false;
    this.newTodo = undefined;
  }

  async addTodo(todo: Todo) {
    await this.todoService.addTodo(todo).toPromise();
    this.isAddActivated = false;
    this.newTodo = undefined;
  }

  showUpdateForm(todo: Todo) {
    this.newTodo = {...todo};
    this.isUpdateActivated = true;
  }

  showAddForm() {
    this.newTodo = {
      id: NaN,
      title: '',
      description: '',
    };
    this.isAddActivated = true;
  }
}
