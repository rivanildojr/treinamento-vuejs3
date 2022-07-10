import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less then 3 character payload', () => {
    expect(validateEmptyAndLength3('22')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('should returns true when input pass a correct param', () => {
    expect(validateEmptyAndLength3('2222')).toBe(true)
  })

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with a invalid param', () => {
    expect(validateEmptyAndEmail('rivas@')).toBe('*Este campo precisa ser um e-mail')
  })

  it('should returns true when pass a correct param', () => {
    expect(validateEmptyAndEmail('rivas@gmail.com.br')).toBe(true)
  })
})
