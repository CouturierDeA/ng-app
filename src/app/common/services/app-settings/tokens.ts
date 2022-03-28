import {InjectionToken} from "@angular/core";
import {makeStateKey, StateKey} from "@angular/platform-browser";
import {PageInfo} from "../../domain/page/page.data";

export type ServerInfo = {
  baseUrl: string
  pageError?: string
  serverTime: number
  pageInfo?: PageInfo
  debug?: any
}
export const SERVER_INFO: InjectionToken<ServerInfo> = new InjectionToken<ServerInfo>('SERVER_INFO')
export const SERVER_INFO_KEY: StateKey<ServerInfo> = makeStateKey<ServerInfo>('SERVER_INFO');

export const JSESSIONID_NAME = 'JSESSIONID'
export const JSESSIONID: InjectionToken<string> = new InjectionToken<ServerInfo>(JSESSIONID_NAME)
export const JSESSIONID_KEY: StateKey<ServerInfo> = makeStateKey<string>(JSESSIONID_NAME);
