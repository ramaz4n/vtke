import MainContainer from '@/containers/main-container/main-container.tsx';

export default function Footer() {
  return (
    <footer className='bg-blueColor flex min-h-[200px] w-full items-center justify-between'>
      <MainContainer>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'></div>
          <div className='flex items-center'></div>
        </div>
      </MainContainer>
    </footer>
  );
}
