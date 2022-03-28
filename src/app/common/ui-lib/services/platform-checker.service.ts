import {Inject, PLATFORM_ID, Injectable} from "@angular/core";
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Injectable()
export class PlatformCheckerService {
  constructor(
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  readonly isBrowser: boolean
  readonly isServer: boolean
}
