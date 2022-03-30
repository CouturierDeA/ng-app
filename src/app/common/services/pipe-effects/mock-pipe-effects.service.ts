import {Injectable} from "@angular/core";
import {switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable()
export class MockPipeEffectsService {
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

  withSuccessNotification<T>(getMessage: (result: T) => string) {
    return (source: Observable<T>) =>
      of({}).pipe(
        switchMap((o) => source.pipe(
          tap(result => getMessage(result))
        )));
  }
}
