import {Injectable} from "@angular/core";
import {PlatformCheckerService} from "../../ui-lib/services/platform-checker.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AppSettingsService {
  constructor(
    private platform: PlatformCheckerService
  ) {
    this.isBrowser = platform.isBrowser;
    this.isServer = platform.isServer;
    this.isDev = !environment.production;
  }

  readonly isBrowser: boolean
  readonly isServer: boolean
  readonly isDev: boolean
}
