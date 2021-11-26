import {TodoQuery} from "../../../alternative-storages/akita-store/todo.query";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AkitaTodoService} from "../../../alternative-storages/akita-store/todo.service";
import {Todo} from "../../../domain/todo";

@Component({
  selector: 'TodoPageAkita',
  templateUrl: './todo-page.component.html'
})
export class TodoPageAkitaComponent implements OnInit, OnDestroy {
  constructor(private courseService: AkitaTodoService, private todoQuery: TodoQuery) {
  }

  search$ = this.todoQuery.search$
  todoList$: Observable<Todo[]> = this.todoQuery.todoList$;

  newTodo?: Todo;
  isUpdateActivated = false;
  isAddActivated = false;

  ngOnInit() {
    this.readTodoList()
  }

  ngOnDestroy() {
  }

  readTodoList = () => {
    this.courseService.readTodoList().toPromise()
  }

  deleteTodo(courseId: number) {
    this.courseService.deleteTodo(courseId).toPromise()
  }

  updateTodo(todo: Todo) {
    this.courseService.updateTodo(todo.id, todo).toPromise()
    this.isUpdateActivated = false;
    this.newTodo = undefined;
  }

  addTodo(todo: Todo) {
    this.courseService.addTodo(todo).toPromise()
    this.isUpdateActivated = false;
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

  onSearch(search: string) {
    this.courseService.updateSearch(search)
  }
}
