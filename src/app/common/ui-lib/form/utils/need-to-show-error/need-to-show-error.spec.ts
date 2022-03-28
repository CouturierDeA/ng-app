import {needToShowError} from "./need-to-show-error";
describe('AuthFormComponent controller unit tests', () => {
  it('needShowError показывает сообщения об ошибке если NgModel touched || dirty', () => {
    expect(
      needToShowError({
        errors: {},
        touched: true,
        dirty: true
      })
    ).toBeTruthy()
  });

  it('needShowError не показывает сообщения об ошибке если NgModel !touched & !dirty', () => {
    expect(
      needToShowError({
        errors: {},
        touched: false,
        dirty: false
      })
    ).toBeFalsy()
  });

  it('needShowError показывает сообщения об ошибке если NgForm submitted', () => {
    expect(
      needToShowError(
        {
          errors: {},
          touched: false,
          dirty: false}, {
          submitted: true
        }
      )
    ).toBeTruthy()
  });

})
