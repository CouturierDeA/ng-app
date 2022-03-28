import {Injectable} from "@angular/core";

@Injectable()
export class AppSettingsServiceForUnitTests {
  readonly isBrowser = true
  readonly isServer = false
  readonly apiUrl: string = ''
  readonly isDev = false
}


@Injectable()
export class AppSettingsServiceForServerUnitTests {
  readonly isBrowser = false
  readonly isServer = true
  readonly apiUrl: string = ''
  readonly isDev = false
}
