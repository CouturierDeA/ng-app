import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {Observable, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  loadScript<T = any>(src: string) {
    return new Observable<T>((sub$: Subscriber<any>) => {
      const {document} = this;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = (res) => {
        sub$.next(res)
        sub$.complete()
      };
      script.onerror = script.onabort = (error: any) => {
        sub$.error(error)
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}
