/* eslint-disable unicorn/prefer-ternary */
import { IMAGE_EXTENSIONS_SET } from '../constants/extensions.ts';

export class UploadedFile extends Object {
  name: string;
  size: number;
  type: string;
  sizeString: string;
  lastModified: number;
  uid: number;
  extension: string;
  isImage: boolean;
  url: string;
  toFile: () => File;

  constructor(file: File, uid: number) {
    super();
    this.toFile = () => file;
    this.name = file.name;
    this.size = file.size;
    this.sizeString = formatBytes(file.size);
    this.type = file.type;
    this.lastModified = file.lastModified;
    this.uid = uid || Date.now(); // Если uid не передан, используем текущее время как uid
    this.extension = file.name.split('.').pop() ?? '';
    this.isImage = IMAGE_EXTENSIONS_SET.has(this.extension);
    this.url = URL.createObjectURL(file);
  }
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Б';

  const k = 1024;

  if (bytes < k) return `${Number(bytes / 1000).toFixed(1)} Кб`;

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}
