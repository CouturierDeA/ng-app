import {Injectable} from "@angular/core";
import {BehaviorSubject, map} from "rxjs";

/**
 * App loading indication service for server and browser platform
 *
 */

@Injectable()
export class LoadingService {
  loadings$ = new BehaviorSubject<number>(0);
  public loading$ = this.loadings$.pipe(
    map(v => Boolean(v)),
  )

  get current() {
    return this.loadings$.getValue()
  }

  setBusy() {
    const {current, loadings$} = this;
    loadings$.next(current + 1);
  }

  setNoBusy() {
    const {current, loadings$} = this;
    if (!current) {
      return
    }
    loadings$.next(current - 1)
  }
}
