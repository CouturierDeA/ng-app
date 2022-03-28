import {Injectable} from "@angular/core";
import {NotificationParams} from "../domain/notification";
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs";
import {finalize, tap} from "rxjs/operators";

@Injectable()
export class DialogService {
  dialogList$ = new BehaviorSubject<NotificationParams[]>([])

  addDialog<O = any, R = any>(n: NotificationParams<O, R>) {
    n.resolver && this.removeDialog(n.resolver);
    let resolver = n.resolver = new Subject<R>()

    const destroy = () => {
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
