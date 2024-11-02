import plural from 'plural-ru';
import { type RegisterOptions } from 'react-hook-form';

export class FormValidator {
  private readonly errors: RegisterOptions;

  constructor() {
    this.errors = {};
  }

  required(name?: string) {
    this.errors.required = name
      ? `Необходимо заполнить поле "${name}"`
      : 'Поле обязательно к заполнению';

    return this;
  }

  max(value: number, errorMessage?: string) {
    this.errors.max = {
      message: errorMessage ?? `Максимальное значение ${value}`,
      value,
    };

    return this;
  }

  min(value: number, errorMessage?: string) {
    this.errors.min = {
      message: errorMessage ?? `Минимальное значение ${value}`,
      value,
    };

    return this;
  }

  minLength(length: number, errorMessage?: string) {
    this.errors.minLength = {
      message:
        errorMessage ??
        `Минимум ${plural(length, '%d символ', '%d символа', '%d символов')}`,
      value: length,
    };

    return this;
  }

  maxLength(length: number, errorMessage?: string) {
    this.errors.maxLength = {
      message:
        errorMessage ??
        `Максимум ${plural(length, '%d символ', '%d символа', '%d символов')}`,
      value: length,
    };

    return this;
  }

  pattern(regex: RegExp, errorMessage?: string) {
    this.errors.pattern = {
      message: errorMessage ?? 'Неверный формат',
      value: regex,
    };

    return this;
  }

  build() {
    return this.errors;
  }
}
