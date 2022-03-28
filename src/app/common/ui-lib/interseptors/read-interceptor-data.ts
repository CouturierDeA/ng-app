import {HttpRequest} from "@angular/common/http";

/**
 * Считываем данные для http interceptors из загловков, затем удаляем, чтобы они не уходили по сети
 * @param req HttpRequest
 * @param META_HEADER - константа заголовка для interceptor
 */
export const readInterceptorData = (req: HttpRequest<any>, META_HEADER: string) => {
  const meta = req.headers.get(META_HEADER)
  const metaStr = meta ? String(meta) : undefined
  req.headers.delete(META_HEADER)
  return metaStr
}
