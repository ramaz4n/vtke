import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchBooking } from '../../../api/booking.ts';
import { UseFetchViewProps } from '../../../types/global.ts';
import { QueryKeys } from '../../../types/query-keys.ts';

export const useBookingView = ({ id }: UseFetchViewProps) => {
  const bookingViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchBooking.view(id),
    queryKey: [QueryKeys.bookingView, id],
  });

  return {
    bookingView: bookingViewQuery.data?.data,
    isLoading: bookingViewQuery.isLoading,
    ...bookingViewQuery,
  };
};
