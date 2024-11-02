import { AnyObjectType } from '../types/global.ts';

export interface FormDataProps {
  data: AnyObjectType;
  files: File[];
}

class FormDataService {
  build({ data, files }: FormDataProps) {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key] as string);
    }

    for (const file of files) {
      formData.append('file[]', file);
    }
  }
}

export const formDataInstance = new FormDataService();
