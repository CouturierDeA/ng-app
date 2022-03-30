import {ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {PipeEffectsService} from "../pipe-effects.service";
import {NotificationService} from "../../../ui-lib/notification-module/services/notification.service";
import {Subject} from "rxjs";
import {LoadingService} from "../../../ui-lib/loading-module/services/loading/loading.service";

describe('PipeEffectsService works correctly ', () => {
  let pes: PipeEffectsService;
  let ns: NotificationService;
  let ls: LoadingService;
  beforeEach(() => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        PipeEffectsService,
        NotificationService,
        LoadingService
      ]
    });
    pes = TestBed.inject(PipeEffectsService);
    ns = TestBed.inject(NotificationService);
    ls = TestBed.inject(LoadingService);
  })

  it('Provides loading and error notifications', fakeAsync(
    () => {
      const someErrorText = 'Some error'
      const nsSpy = spyOn(ns, 'notify');
      const setBusySpy = spyOn(ls, 'setBusy');
      const setNoBusySpy = spyOn(ls, 'setNoBusy');
      const sub$ = new Subject<any>()
      sub$.pipe(
        pes.withEffects()
      ).subscribe({
        error: ()=> {
          expect(nsSpy).toHaveBeenCalledWith({message: someErrorText, type: 'danger', lifeTime: Infinity})
        }
      })
      expect(setBusySpy).toHaveBeenCalled()
      sub$.error(someErrorText);
      expect(setNoBusySpy).toHaveBeenCalled()
    }
  ))

  it('Provides loading notifications', fakeAsync(
    () => {
      const setBusySpy = spyOn(ls, 'setBusy');
      const setNoBusySpy = spyOn(ls, 'setNoBusy');
      const sub$ = new Subject<any>()
      sub$.pipe(
        pes.withLoader()
      ).subscribe();
      expect(setBusySpy).toHaveBeenCalled()
      sub$.complete()
      expect(setNoBusySpy).toHaveBeenCalled()
    }
  ))

  it('Provides error notifications', fakeAsync(
    () => {
      const someErrorText = 'Some error'
      const nsSpy = spyOn(ns, 'notify');
      const sub$ = new Subject<any>()
      sub$.pipe(
        pes.withErrorNotification()
      ).subscribe({
        error: ()=> {
          expect(nsSpy).toHaveBeenCalledWith({message: someErrorText, type: 'danger', lifeTime: Infinity})
        }
      })
      sub$.error(someErrorText);
    }
  ))

  it('Provides success notifications', fakeAsync(
    () => {
      const successText = 'Some error'
      const nsSpy = spyOn(ns, 'notify');
      const sub$ = new Subject<any>()
      sub$.pipe(
        pes.withSuccessNotification((res)=> successText)
      ).subscribe({
        next: ()=> {
          expect(nsSpy).toHaveBeenCalledWith({message: successText, type: 'success', lifeTime: 2000})
        }
      })
      sub$.next(successText);
    }
  ))
})
