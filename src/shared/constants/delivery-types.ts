import { LocationAlt } from '@/shared/ui/icons/location-alt.tsx';
import { TrackSide } from '@/shared/ui/icons/track-side.tsx';

export const DELIVERY_TYPES = [
  {
    content: 'Самовывоз',
    icon: LocationAlt,
    value: 'self',
  },
  {
    content: 'Транспортная компания',
    icon: TrackSide,
    value: 'company',
  },
];
