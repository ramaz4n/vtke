import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const LocationAlt = (props: Props) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='m19.071 17.213a10.141 10.141 0 0 0 0-14.259 9.94 9.94 0 0 0 -14.142 0 10.14 10.14 0 0 0 .026 14.284l3.584 3.339a4.92 4.92 0 0 0 6.9.018zm-5.729-2.564a3.023 3.023 0 0 1 -2.683 0l-2-1a2.986 2.986 0 0 1 -1.659-2.684v-2.965a2.986 2.986 0 0 1 1.658-2.685l2-1a3.014 3.014 0 0 1 2.683 0l2 1a2.986 2.986 0 0 1 1.659 2.685v2.966a2.986 2.986 0 0 1 -1.658 2.684zm1.607-6.955a1 1 0 0 1 .051.306v2.966a.994.994 0 0 1 -.553.895l-2 1a1.006 1.006 0 0 1 -.895 0l-2-1a.994.994 0 0 1 -.552-.896v-2.965a1 1 0 0 1 .051-.3l2.18 1.09a1.72 1.72 0 0 0 1.538 0zm5.051 15.306a1 1 0 0 1 -1 1h-14a1 1 0 0 1 0-2h14a1 1 0 0 1 1 1z' />
  </svg>
);

LocationAlt.displayName = 'Icon';
