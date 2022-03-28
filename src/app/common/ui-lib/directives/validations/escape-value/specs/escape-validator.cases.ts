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
    descr: 'Если отсутствует blacklist и ввод присутствует - validate возвращает null',
    output: null,
    formValid: true
  },
  {
    descr: 'Если blacklist пустой и ввод присутствует - validate возвращает null',
    blacklist: [],
    value: '1234',
    output: null,
    formValid: true
  },
  {
    descr: 'Если blacklist заполнен и ввод отсутствует - validate возвращает null',
    blacklist: ['1234'],
    output: null,
    formValid: true
  },
  {
    descr: 'Если value не входит в список blacklist - validate возвращает null',
    blacklist: ['123'],
    value: '1234',
    output: null,
    formValid: true
  },
  {
    descr: 'Если value входит в список blacklist - validate возвращает объект с ошибкой (1)',
    blacklist: ['123'],
    value: '123',
    output: {
      escapeValue: true
    },
    formValid: false
  },
  {
    descr: 'Если value входит в список blacklist - validate возвращает объект с ошибкой (2)',
    blacklist: ['321'],
    value: '321',
    output: {
      escapeValue: true
    },
    formValid: false
  },

  {
    descr: 'Если value входит в список blacklist - validate возвращает объект с ошибкой (3)',
    blacklist: [''],
    value: '',
    output: {
      escapeValue: true
    },
    formValid: false
  },
  {
    descr: `Если value = undefined, blacklist = [''] - validate возвращает null`,
    blacklist: [''],
    value: undefined,
    output: null,
    formValid: true
  },
  {
    descr: `Если value = '', blacklist = [undefined] - validate возвращает null`,
    blacklist: [undefined] as any,
    value: '',
    output: null,
    formValid: true
  },
]
