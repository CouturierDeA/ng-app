type TestCase = {
  descr: string,
  value?: any
  blacklist?: string[],
  output: null | {
    escapeValue: boolean
  },
  formValid: boolean
}
export const escapeValidatorTestCases: Array<TestCase> = [
  {
    descr: 'If there is no blacklist and input is present - validate returns null',
    output: null,
    formValid: true
  },
  {
    descr: 'If blacklist is empty and input is present - validate returns null',
    blacklist: [],
    value: '1234',
    output: null,
    formValid: true
  },
  {
    descr: 'If the blacklist is full and there is no input - validate returns null',
    blacklist: ['1234'],
    output: null,
    formValid: true
  },
  {
    descr: 'If value is not blacklisted, validate returns null',
    blacklist: ['123'],
    value: '1234',
    output: null,
    formValid: true
  },
  {
    descr: 'If value is blacklisted - validate returns an object with an error (1)',
    blacklist: ['123'],
    value: '123',
    output: {
      escapeValue: true
    },
    formValid: false
  },
  {
    descr: 'If value is blacklisted - validate returns an object with an error (2)',
    blacklist: ['321'],
    value: '321',
    output: {
      escapeValue: true
    },
    formValid: false
  },

  {
    descr: 'If value is blacklisted - validate returns an object with an error (3)',
    blacklist: [''],
    value: '',
    output: {
      escapeValue: true
    },
    formValid: false
  },
  {
    descr: `If value = undefined, blacklist = [''] - validate returns null`,
    blacklist: [''],
    value: undefined,
    output: null,
    formValid: true
  },
  {
    descr: `If value = '', blacklist = [undefined] - validate returns null`,
    blacklist: [undefined] as any,
    value: '',
    output: null,
    formValid: true
  },
]
