import { ValidationError } from 'yup';

interface CustomValidationErrors {
  [key: string]: string;
}

export default function getValidationsErrors(
  errors: ValidationError,
): CustomValidationErrors {
  const validationsErros: CustomValidationErrors = {};
  errors.inner.forEach(error => {
    validationsErros[error.path || ''] = error.message;
  });

  return validationsErros;
}
