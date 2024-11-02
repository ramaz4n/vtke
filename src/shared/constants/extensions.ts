export const IMAGE_EXTENSIONS: Record<string, boolean> = {
  'image/gif': true,
  'image/jpeg': true,
  'image/jpg': true,
  'image/png': true,
  'image/psd': true,
  'image/svg': true,
  'image/svg+xml': true,
  'image/webp': true,
};

export const IMAGE_EXTENSIONS_SET: Set<string> = new Set([
  'jpeg',
  'jpg',
  'png',
]);

export const IMAGE_EXTENSIONS_ARRAY: Array<string> = ['jpeg', 'jpg', 'png'];

export const FILE_EXTENSION_PERMISSION_STRING =
  'jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, txt, ppt, pptx, webm, mp3, ogg, m4a';
export const FILE_EXTENSION_PERMISSION = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'pdf',
  'txt',
  'ppt',
  'pptx',
  'webm',
  'mp3',
  'ogg',
  'm4a',
]);
