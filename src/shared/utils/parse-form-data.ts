/* eslint-disable @typescript-eslint/ban-ts-comment */
interface FormDataParseProps<T> {
  data?: T;
  fileName?: string;
  files?: File[] | File;
}

export const parseFormData = <T>({
  data,
  files = [],
  fileName = 'files',
}: FormDataParseProps<T>) => {
  const postData = new FormData();

  if (fileName && data) {
    // @ts-ignore
    delete data[fileName];
  }

  if (data) {
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      postData.append(k, v as string);
    }
  }

  if (!Array.isArray(files)) {
    postData.append(`${fileName}`, files);
  }

  if (Array.isArray(files) && [...files]?.length) {
    for (const file of files) {
      postData.append(`${fileName}[]`, file);
    }
  }

  return postData;
};
