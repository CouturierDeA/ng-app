// https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
import {interval, of, forkJoin} from 'rxjs';
import {delay, take} from "rxjs/operators";

const myPromise = (val: any) =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 2000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin({
  //emit 'Hello' immediately
  sourceOne: of('Hello'),
  //emit 'World' after 1 second
  sourceTwo: of('World').pipe(delay(1000)),
  //emit 0 after 1 second
  sourceThree: interval(1000).pipe(take(5)),
  //emit 0...1 in 1 second interval
  sourceFour: interval(1000).pipe(take(5)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  sourceFive: myPromise('RESULT')
});
const subscribe = example.subscribe(val => console.log(val));
