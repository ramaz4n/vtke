import { getLocalTimeZone } from '@internationalized/date';
import { DateValue } from '@nextui-org/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPromoCodes } from '../../../api/promo-codes.ts';
import { PromoCodesList } from '../../../types/api/promo-code.ts';
import { QueryKeys } from '../../../types/query-keys.ts';
import { parseQueryParamsForApi } from '../../../utils/table-default-query-params.ts';
import { useGetParams } from '../../use-get-params.ts';

function formatParser(value: DateValue) {
  return value.toDate(getLocalTimeZone()) / 1000;
}

export const usePromoCodeList = (params?: PromoCodesList['params']) => {
  const { paramsEntries } = useGetParams<PromoCodesList['params']>();

  const promoCodesQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetchPromoCodes.list({
        ...params,
        ...parseQueryParamsForApi<PromoCodesList['params']>(paramsEntries, {
          dateNames: new Set(['start', 'finish']),
          formatParser,
        }),
      }),
    queryKey: [QueryKeys.promoCodes, params, paramsEntries],
  });

  return {
    promoCodesList: promoCodesQuery.data?.data.models,
    ...promoCodesQuery,
  };
};
