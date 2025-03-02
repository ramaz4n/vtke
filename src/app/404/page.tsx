import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: '404',
  title: '404',
};

export default function Page() {
  return (
    <div>
      <h1>Ошибка 404</h1>
    </div>
  );
}
