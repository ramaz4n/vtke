import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPromoCodes } from '../../../api/promo-codes.ts';
import { UseFetchViewProps } from '../../../types/global.ts';

export const usePromoCodeView = ({ id, queryKey }: UseFetchViewProps) => {
  const promoCodeViewQuery = useQuery({
    enabled: !!id,
    placeholderData: keepPreviousData,
    queryFn: () => fetchPromoCodes.view(id),
    queryKey: [queryKey, id],
  });

  return {
    isLoading: promoCodeViewQuery.isLoading,
    promoCodeView: promoCodeViewQuery.data?.data,
  };
};
