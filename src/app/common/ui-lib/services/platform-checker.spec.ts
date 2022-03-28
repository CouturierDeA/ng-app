import {PlatformCheckerService} from "./platform-checker.service";
import {PLATFORM_BROWSER_ID, PLATFORM_SERVER_ID} from "../constants/platform";

describe('PlatformCheckerService работает корректно', () => {

  it(`isBrowser - true; isServer - false для браузера`, () => {
    let pc = new PlatformCheckerService(PLATFORM_BROWSER_ID)
    expect(pc.isBrowser).toEqual(true)
    expect(pc.isServer).toEqual(false)
  })

  it(`isBrowser - false; isServer - true для сервера`, () => {
    let pc = new PlatformCheckerService(PLATFORM_SERVER_ID)
    expect(pc.isBrowser).toEqual(false)
    expect(pc.isServer).toEqual(true)
  })
})
