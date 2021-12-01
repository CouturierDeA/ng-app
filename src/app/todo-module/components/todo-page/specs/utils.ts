import {TodoService} from "../../../services/todo.service";
import {Todo} from "../../../domain/todo";
import {of} from "rxjs";

export const getTodoServiceMocks = () => {
  let service: Omit<TodoService, 'http'>
  let todoList: Todo[]

  todoList = [
    {
      id: 1,
      title: 'Test todo 1',
      description: 'Test todo 1 description',
      completed: false
    },
    {
      id: 2,
      title: 'Test todo 2',
      description: 'Test todo 2 description',
      completed: false
    }
  ]

  service = {
    getTodoList: () => {
      return of(todoList)
    },
    addTodo(todo: Todo) {
      // todoList.push(todo)
      return of(todo)
    },
    updateTodo(todoId: number, todo: Todo) {
      todoList = todoList.map(ti => ti.id === todoId ? todo : ti)
      return of(todo)
    },
    deleteTodo(todoId: number) {
      todoList = todoList.filter(ti => ti.id !== todoId)
      return of(todoId)
    },
    checkUnique(value: string, fieldName: string, entityId?: number) {
      let key = fieldName as keyof Todo
      let result = !todoList.find(todo=> todo[key] === value && todo.id !== entityId)
      return of(result)
    }
  };
  return {
    todoList,
    service
  }
}
