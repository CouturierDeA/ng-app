// import {TestBed} from "@angular/core/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
// import {Legacy200ErrorInterceptor} from "./interceptors/legacy-200-error.interceptor";
// import {Observable, of} from "rxjs";
import {HttpUtilsService} from "./http-utils.service";

describe('PasswordService работает корректно', () => {
  const utils = new HttpUtilsService()
  it('utils ', () => {
    expect(utils).toBeDefined()
  })

  it('ловит 200-й ответ с body.status == -1', () => {
    try {
      utils.catch200LegacyError(new HttpResponse<any>({
        status: 200,
        body: {
          status: -1
        }
      }))
    } catch (e: any) {
      expect(e.message.trim()).toEqual('Помилка запиту')
    }
  })

  it('не ловит 200-й ответ без body.status == -1', () => {
    utils.catch200LegacyError(new HttpResponse<any>({
      status: 200,
    }))
    expect().nothing()
  })

  it('не ловит 200-й ответ без body', () => {
    utils.catch200LegacyError(new HttpResponse<any>({
      status: 200,
      body: {}
    }))
    expect().nothing()
  })

  it('ловит unsuccessfulResponse, если статус ответа не попал в дефолтный successfulStatuses', () => {
    try {
      const status = 240
      utils.catchUnsuccessfulResponse(
        new HttpResponse<any>({
          status,
        }),
        '240-я ошибка'
      )
    } catch (e: any) {
      expect(e.message).toEqual('240-я ошибка')
    }
    expect().nothing()
  })

  it('не ловит unsuccessfulResponse если передан successfulStatuses и статус ответа попал в него',
    () => {
      const status = 240
      utils.catchUnsuccessfulResponse(
        new HttpResponse<any>({
          status,
        }),
        '240-я ошибка',
        [status]
      )
      expect().nothing()
    })

  it('возвращает requestId из хедеров ответа',
    () => {
      const REQ_ID_PAYLOAD = 'adssadasdasdasda'
      const reqId = utils.getReqId(
        new HttpResponse<any>({
          headers: new HttpHeaders().set('x_request_id', REQ_ID_PAYLOAD)
        }),
      )
      expect(reqId).toContain(REQ_ID_PAYLOAD)
    })

  it('возвращает "" если ничего не передано', () => {
    const reqId = utils.getReqId()
    expect(reqId).toEqual('')
  })

  it('если в хедерах нет requestId, возвращает ""',
    () => {
      const reqId = utils.getReqId(
        new HttpResponse<any>({}),
      )
      expect(reqId).toEqual('')
    })


  it('is403 возвращает true когда Error instanceof HttpErrorResponse и статус 403',
    () => {
      const res = new HttpErrorResponse({
        status: 403
      })
      expect(utils.is403(res)).toBeTruthy()
    }
  )

  it('rethrow при передаче неправильных параметров возвращает сообщение по дефолту',
    () => {
      try {
        utils.rethrow(null as any)
      } catch (e: any) {
        expect(e.message).toContain('Помилка запиту')
      }

    }
  )

  it('is403 возвращает false когда Error instanceof HttpErrorResponse и статус не 403',
    () => {
      const res = new HttpErrorResponse({
        status: 401
      })
      expect(utils.is403(res)).toBeFalsy()
    }
  )

  it('читает данные из headers для interceptors',
    () => {
      const HEADER_FOR_INTERCEPTOR = 'HEADER_FOR_INTERCEPTOR';
      const content = 'TEST-CONTENT';

      const req = new HttpRequest('GET', '', {
        headers: new HttpHeaders()
          .set(HEADER_FOR_INTERCEPTOR, content)
      })
      const result = utils.readInterceptorData(req, HEADER_FOR_INTERCEPTOR)
      expect(result).toEqual(content)
    }
  )

  it('unifyMessage возвращает errorMessage с requestId из хедеров', () => {
      const REQ_ID_PAYLOAD = '12321312312312312313';
      const errorMessage = 'Test server error';
      const res = new HttpErrorResponse({
        headers: new HttpHeaders().set('x_request_id', REQ_ID_PAYLOAD),
        error: {
          message: errorMessage
        }
      })
      const result = utils.unifyMessage(res)
      expect(result).toContain(errorMessage)
      expect(result).toContain(REQ_ID_PAYLOAD)
    }
  )

  it('traverseMessage работает корректно',
    () => {
      const testMessage = 'TEST MESSAGE'
      let result = utils.traverseMessage({
        error: testMessage
      })
      expect(result).toEqual(testMessage)
      result = utils.traverseMessage({
        body: {
          error: testMessage
        }
      })
      expect(result).toEqual(testMessage)
      result = utils.traverseMessage({
        body: {
          message: testMessage
        }
      })
      expect(result).toEqual(testMessage)
      result = utils.traverseMessage({
        body: {}
      })
      expect(result).toEqual(undefined)

      result = utils.traverseMessage({})
      expect(result).toEqual(undefined)

      result = utils.traverseMessage()
      expect(result).toEqual(undefined)

      result = utils.traverseMessage({
        error: {
          message: testMessage
        }
      })
      expect(result).toEqual(testMessage)

      result = utils.traverseMessage({
        body: {
          exMsg: testMessage
        }
      })
      expect(result).toEqual(testMessage)

      result = utils.traverseMessage({
        body: {
          exMessage: testMessage
        }
      })
      expect(result).toEqual(testMessage)

      result = utils.traverseMessage({
        error: {
          body: {
            exMessage: testMessage
          }
        }
      })
      expect(result).toEqual(testMessage)
      result = utils.traverseMessage({
        error: {
          error: {
            exMessage: testMessage
          }
        }
      })
      expect(result).toEqual(testMessage)
    }
  )

  // const handler: HttpHandler = {
  //   handle: (req: HttpRequest<any>) => {
  //     return of(new HttpResponse())
  //   }
  // };
  //
  // const mockHttpClient = new HttpClient(handler)
  //
  // let http: HttpClient
  //
  // beforeEach(() => {
  //   TestBed.resetTestingModule()
  //   TestBed.configureTestingModule({
  //     providers: [
  //       HttpUtilsService,
  //       {provide: HttpClient, useValue: mockHttpClient},
  //       {
  //         provide: HTTP_INTERCEPTORS,
  //         useClass: Legacy200ErrorInterceptor,
  //         multi: true
  //       }
  //     ]
  //   });
  //
  //   http = TestBed.inject(HttpClient)
  //   // httpUtils = TestBed.inject(HttpUtilsService)
  // })
  //
  // it('http toBeDefined', () => {
  //   expect(http).toBeDefined()
  // })
  //
  // it('http toBeDefined', () => {
  //   const spy = spyOn(handler, 'handle')
  //   // const spy2 = spyOn(httpUtils, 'catch200LegacyError').and.callThrough()
  //   http.get('').subscribe()
  //   expect(spy).toHaveBeenCalled()
  //
  //   // expect(spy2).toHaveBeenCalled()
  // })

})
