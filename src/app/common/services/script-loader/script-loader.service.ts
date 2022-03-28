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
    let script = document.createElement('script');
    return new Observable<T>((sub$: Subscriber<any>) => {
      script.type = 'text/javascript';
      script.src = src;
      script.onload = (res) => {
        // this.scripts[name].loaded = true;
        // resolve({script: name, loaded: true, status: 'Loaded'});
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
