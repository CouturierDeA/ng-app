import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable()
export class UiEffectsServiceForTesting {
  withEffects<T>() {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source));
  }

  withLoader<T>() {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source));
  }

  withErrorNotification<T>() {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source));
  }
}
