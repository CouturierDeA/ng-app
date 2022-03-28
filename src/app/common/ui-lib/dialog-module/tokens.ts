import {HttpContextToken} from "@angular/common/http";

export const ESCAPE_HTTP_ERROR_NOTIFICATION = new HttpContextToken<boolean>(() => false)
