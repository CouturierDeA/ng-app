import {HttpContextToken} from "@angular/common/http";

export const ESCAPE_LOADING_TOKEN = new HttpContextToken<boolean>(() => false);
