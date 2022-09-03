import {Injectable} from "@angular/core";
import {NotificationParams} from "../domain/notification";
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs";
import {finalize, takeUntil, tap} from "rxjs/operators";

@Injectable()
export class DialogService {
  dialogList$ = new BehaviorSubject<NotificationParams[]>([])

  addDialog<ComponentPropsType = any, ResolvingType = any>(n: NotificationParams<ComponentPropsType, ResolvingType>) {
    n.resolver && this.removeDialog(n.resolver);
    const resolver = n.resolver = new Subject<ResolvingType>()
    const complete$ = new Subject();
    const destroy = () => {
      complete$.complete()
      n.resolver?.unsubscribe();
      const {dialogList$} = this;
      const ov = dialogList$.getValue()
      const index = ov.indexOf(n)
      if (index > -1) {
        const ns = ov.filter(v => v !== n)
        dialogList$.next(ns)
      }
    }
    resolver.pipe(
      tap(destroy),
      finalize(destroy),
      takeUntil(complete$),
    ).toPromise()
    const {dialogList$} = this;
    const ns = dialogList$.getValue()
    dialogList$.next([...ns, n])
    return resolver
  }

  removeDialog(resolver?: Subject<any>) {
    if (resolver && !resolver.isStopped) {
      resolver.complete()
    }
  }
}
