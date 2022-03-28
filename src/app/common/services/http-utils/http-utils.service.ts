import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {readInterceptorData} from "../../ui-lib/interseptors/read-interceptor-data";

@Injectable()
export class HttpUtilsService {

  traverseMessage(obj?: any) {
    if (typeof obj?.error === 'string') {
      return obj.error
    }
    const body = obj?.error?.body || obj?.body || obj?.error?.error || obj?.error || obj
    if (!body || typeof body !== 'object') {
      return
    }
    return body.exMessage || body.exMsg || body.message || body.errMsg || body.error
  }

  unifyMessage(error: Error | HttpErrorResponse | HttpResponse<any>) {
    if (error instanceof HttpErrorResponse) {
      return this.traverseMessage(error) + this.getReqId(error)
    }
    return this.traverseMessage(error)
  }

  getReqId(error?: HttpErrorResponse | HttpResponse<any>) {
    if (!error || !error.headers) {
      return ''
    }
    const reqId = error.headers.get('x_request_id')
    return reqId ? ` reqId ${reqId}` : ''
  }

  catch200LegacyError(response: HttpResponse<any>, errMessage?: string) {
    if (response.status === 200 && response.body?.status == -1) {
      this.rethrow(response, errMessage)
    }
  }

  catchUnsuccessfulResponse(response: HttpResponse<any>, errMessage?: string, successfulStatuses?: number[]) {
    let successful = successfulStatuses || [200, 201, 204];
    if (!successful.includes(response.status)) {
      this.rethrow(response, errMessage)
    }
  }

  /**
   * метод для "скидывания" response в ошибку
   *
   * @param response: HttpResponse<any>
   * @param errMessage - ошибка, которую нужно показать (если не передавать,
   * то текст ошибки будет искаться в response.body)
   */
  rethrow(response: HttpResponse<any>, errMessage?: string) {
    throw new Error(errMessage || this.unifyMessage(response) || `Помилка запиту ${response?.url || ''}`)
  }

  is403(error: HttpErrorResponse | Error) {
    const isHttpError = error instanceof HttpErrorResponse;
    return isHttpError && error.status === 403
  }

  readInterceptorData = readInterceptorData

}
