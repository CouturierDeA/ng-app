import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AppSettingsService} from "../app-settings/app-settings.service";

@Injectable()
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private settings: AppSettingsService
  ) {
  }

  apiUrl = this.settings.apiUrl

  public checkUserRegistrationDto(
    payload: {
      email: string,
      firstName: string,
      language: string,
      lastName: string,
      login: string,
      middleName: string,
      password: string,
      sex: boolean
    },
  ) {

    const url = `${this.apiUrl}/registration/check-user-registration-dto`;

    return this.http.post<any>(url, payload, {
      observe: 'response',
    }).pipe(
      map(response => {
        const {status, body: data} = response;
        const successStatuses = [200, 201, 204];
        const isOk = successStatuses.includes(status) && data?.status != -1;
        if (!isOk) {
          throw data?.exMessage || data?.message || `Помилка запиту ${url}`
        }
        return data?.entityHash
      })
    )

  }

}
