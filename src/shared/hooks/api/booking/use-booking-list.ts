import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchBooking } from '../../../api/booking.ts';
import { BookingList } from '../../../types/api/booking.ts';
import { UseFetchListProps } from '../../../types/global.ts';

export const useBookingList = ({
  params,
  queryKey,
}: UseFetchListProps<BookingList['request']>) => {
  const bookingQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchBooking.list({
        ...params,
      }),
    queryKey: [queryKey, params],
  });

  return {
    bookingList: bookingQuery.data?.data?.models,
    isLoading: bookingQuery.isLoading,
  };
};
