import {BehaviorSubject} from 'rxjs';

type CrudEntity<T, I> = T & { id: I }

export class Store<T, I = number> {
  entities$ = new BehaviorSubject<CrudEntity<T, I>[]>([])
  getEntities() {
    return this.entities$.getValue()
  }
  updateEntities(todoList: CrudEntity<T, I>[]) {
    this.entities$.next(todoList)
  }
  addEntity(newEntity: CrudEntity<T, I>) {
    this.entities$.next([
      ...this.entities$.value, newEntity
    ]);
  }
  deleteEntity(entityId: I) {
    this.entities$.next([
      ...this.entities$.value.filter(entityI => entityI.id !== entityId)
    ]);
  }
  updateEntity(newEntity: CrudEntity<T, I>) {
    this.entities$.next([
      ...this.entities$.value.map(
        entityI => entityI.id === newEntity.id ? newEntity : entityI
      )
    ]);
  }
  subscribe(cb: (todo: CrudEntity<T, I>[]) => void): Function {
    const sub = this.entities$.subscribe(cb)
    return () => sub.unsubscribe()
  }
}
