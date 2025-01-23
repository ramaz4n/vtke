import { PropsWithChildren } from 'react';

export default function MainContainer({ children }: PropsWithChildren) {
  return (
    <section className='mx-auto w-full max-w-screen-lg px-7'>
      {children}
    </section>
  );
}
