/* eslint-disable indent */
import { useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useDebounceCallback, useLocalStorage } from 'usehooks-ts';

import { searchApi } from '@/shared/api/search.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';
import { SearchCoreProps } from '@/shared/types/api/search.ts';

const DEBOUNCE_TIME = 1150;

export const useGlobalSearch = () => {
  const pathname = usePathname();

  const [storage, setStorage] = useLocalStorage<SearchCoreProps[]>(
    LS_KEYS.globalSearch,
    [],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const cacheRef = useRef<Record<string, SearchCoreProps[]>>({});
  const modal = useModal();

  const [queryResponse, setQueryResponse] = useState<SearchCoreProps[] | null>(
    null,
  );

  const [queryInputValue, setQueryInputValue] = useState('');

  const searchMutation = useMutation({
    mutationFn: (variables: { q: string }) => searchApi.search(variables),
    onSuccess: (response, { q }) => {
      cacheRef.current[q] = response;

      setQueryResponse(response);
    },
  });

  const onSearch = useDebounceCallback((value: string) => {
    const q = value;

    setQueryInputValue(q);

    if (!q?.length) {
      setQueryResponse(null);

      return;
    }

    if (cacheRef.current[q]) {
      setQueryResponse(cacheRef.current[q]);

      return;
    }

    searchMutation.mutate({ q });
  }, DEBOUNCE_TIME);

  const onSearchWithoutDebounce = (value: string) => {
    const q = value;

    setQueryInputValue(q);

    if (!q?.length) {
      setQueryResponse(null);

      return;
    }

    if (cacheRef.current[q]) {
      setQueryResponse(cacheRef.current[q]);

      return;
    }

    searchMutation.mutate({ q });
  };

  const onSelectItem = (item: SearchCoreProps) => {
    const setHistoryItems = new Set(storage.map(({ title }) => title));

    if (!setHistoryItems.has(item.title)) {
      setStorage((prev) => [item, ...prev]);
    }
  };

  function deleteHistoryItem(id: number) {
    setStorage((prev) => prev.filter((item) => item.id !== id));
  }

  function clearHistory() {
    setStorage([]);
  }

  function clearInputValue() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setQueryInputValue('');
    setQueryResponse(null);
  }

  function onHistoryItemClick(query: string) {
    if (inputRef.current) {
      inputRef.current.value = query;
    }

    onSearchWithoutDebounce(query);
  }

  const queryGroupResponse = Object.entries(
    (queryResponse || []).reduce(
      (acc: Record<string, SearchCoreProps[]>, item) => {
        acc[item.type] = [...(acc[item.type] || []), item];

        return acc;
      },
      {},
    ),
  );

  const getHref = (type: string, slug: string) =>
    ({
      news: LINKS.news(slug),
      product: LINKS.products(slug),
      service: LINKS.services(slug),
    })[type] ?? '/';

  const filteredStorage = (() => {
    if (!queryResponse?.length) {
      return storage;
    }

    return queryInputValue.length
      ? storage.filter(({ title }) =>
          title.toLowerCase().includes(queryInputValue.toLowerCase()),
        )
      : storage;
  })();

  useEffect(() => {
    modal.hide('global-search');

    return () => {
      setQueryResponse(null);
      setQueryInputValue('');
    };
  }, [pathname]);

  return {
    clearHistory,
    clearInputValue,
    deleteHistoryItem,
    filteredStorage,
    getHref,
    inputRef,
    onHistoryItemClick,
    onSearch,
    onSelectItem,
    queryGroupResponse,
    queryInputValue,
    queryResponse,
    searchMutation,
    storage,
  };
};
