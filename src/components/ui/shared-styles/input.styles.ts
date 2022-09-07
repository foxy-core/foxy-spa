import { ValidationStatus } from '@@/domain/validation'

export const inputStyles = {
  container: 'relative h-12',
  inputElement: (hasLabel: boolean, validationStatus?: ValidationStatus) => [
    'peer h-12 text-surface-800 w-full appearance-none rounded-lg ring-1 bg-surface-50 px-4 transition-colors duration-100 placeholder:invisible placeholder:opacity-0 hover:bg-surface-100 focus:bg-surface-100 focus:outline-none',
    {
      'ring-surface-100':
        !validationStatus || validationStatus === ValidationStatus.NotValidated,
      'ring-error-lightest dark:ring-error-lighter':
        validationStatus === ValidationStatus.Invalid,
      'ring-success-lightest dark:ring-success-lighter':
        validationStatus === ValidationStatus.Valid,
    },
    hasLabel ? 'pt-[1.125rem] pb-1' : 'py-3',
  ],
  labelElement:
    'pointer-events-none absolute top-1.5 left-4 select-none w-full text-xs text-surface-400 transition-all duration-100 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs',
  errorLabel: 'absolute top-0 left-0 text-error-lighter font-light',
  defaultLabel: 'absolute top-0 left-0',
  errorIcon: 'absolute w-6 h-6 text-error-lighter right-5 top-3',
}
