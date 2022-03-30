import {needToShowError} from "./need-to-show-error";
describe('AuthFormComponent controller unit tests', () => {
  it('needShowError shows error messages if NgModel touched or dirty', () => {
    expect(
      needToShowError({
        errors: {},
        touched: true,
        dirty: true
      })
    ).toBeTruthy()
  });

  it('needShowError does not show an error message if NgModel !touched & !dirty', () => {
    expect(
      needToShowError({
        errors: {},
        touched: false,
        dirty: false
      })
    ).toBeFalsy()
  });

  it('needShowError shows error messages if NgForm submitted', () => {
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
