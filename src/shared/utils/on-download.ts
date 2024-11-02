export interface DownloadProps {
  href: string;
  name: string;
  blank?: boolean;
  id?: number | string;
}

export const handleDownload = ({
  name,
  href,
  id,
  blank = true,
}: DownloadProps) => {
  const element = document.createElement('a');

  element.href = href;

  if (blank) {
    element.target = '_blank';
  }
  element.download = name ?? `gallery-photo-${id}`;

  element.click();
  element.remove();
};
