// https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest
import {combineLatest} from "rxjs";
import {map, tap} from "rxjs/operators";
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

const combined$ = combineLatest(
  [
    of('Hello'),
    of('World').pipe(delay(1000)),
  ]
).pipe(
  map(v => {
    const [hello, world] = v
    return `${hello} ${world}`
  }),
  tap(console.log)
);
combined$.subscribe()
