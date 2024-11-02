import { UploadedFile } from '../utils/file-service.ts';

export interface ChatFormProps {
  files: UploadedFile[];
  message: string;
}

export type ChatFormSendProps = FormData;
