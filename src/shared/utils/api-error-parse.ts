import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import { ApiValidationError } from '../types/global';

interface ApiErrorParseProps<T extends FieldValues> {
  error: ApiValidationError;
  setError: UseFormSetError<T>;
  fieldArrayName?: string;
  name?: string;
}

export const apiErrorParse = <T extends FieldValues>({
  fieldArrayName,
  setError,
  error,
  name,
}: ApiErrorParseProps<T>) => {
  if (typeof error === 'string') {
    setError(name as FieldPath<T>, {
      message: error,
    });

    return;
  }
  if (fieldArrayName) {
    for (const [index, item] of Object.entries(error)) {
      for (const key in item) {
        setError(`${fieldArrayName}.${index}.${key}` as FieldPath<T>, {
          message: item[key][0],
        });
      }
    }

    return;
  }

  for (const [k, v] of Object.entries(error)) {
    setError(k as FieldPath<T>, {
      message: v.length > 1 ? v.join(',') : v[0],
    });
  }
};
