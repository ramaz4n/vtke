import { PropsWithChildren } from 'react';

export default function MainContainer({ children }: PropsWithChildren) {
  return (
    <section className='mx-auto w-full max-w-screen-2xl px-6'>
      {children}
    </section>
  );
}
