import { PropsWithChildren } from 'react';

export default function MainContainer({ children }:PropsWithChildren) {

  return (
    <div className="px-[5%]">
      {children}
    </div>
  );
}
