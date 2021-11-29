import {Component, OnInit} from '@angular/core';
import {Todo} from "../../domain/todo";
import {Observable} from "rxjs";
import {map, share} from "rxjs/operators";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'TodoPageRx',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  constructor(
    private todoService: TodoService,
  ) {
  }

  completedTodoList$?: Observable<Todo[]>
  uncompletedTodoList$?: Observable<Todo[]>
  totalLength$?: Observable<number>
  completedLength$?: Observable<number>
  uncompletedLength$?: Observable<number>

  ngOnInit() {
    const src$ = this.todoService.getTodoList().pipe(
      share()
    )
    this.completedTodoList$ = src$.pipe(
      map(list => list.filter(li => li.completed))
    );
    this.uncompletedTodoList$ = src$.pipe(
      map(list => list.filter(li => !li.completed))
    );
    const {completedTodoList$, uncompletedTodoList$} = this;

    this.totalLength$ = src$.pipe(
      map(v => v.length)
    )
    this.completedLength$ = completedTodoList$.pipe(
      map(v => v.length)
    )
    this.uncompletedLength$ = uncompletedTodoList$.pipe(
      map(v => v.length)
    )
  }


  doDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
  }

  showUpdateForm(todo: Todo) {
    throw 'Unsupported yet'
  }

  showAddForm() {
    throw 'Unsupported yet'
  }
}
