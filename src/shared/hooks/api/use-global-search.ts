import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounceCallback, useLocalStorage } from 'usehooks-ts';

import { searchApi } from '@/shared/api/search.ts';
import { LS_KEYS } from '@/shared/constants/ls-keys.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';

const DEBOUNCE_TIME = 750;

type StorageSearchItem = {
  id: number;
  query: string;
};

export const useGlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [storage, setStorage] = useLocalStorage<StorageSearchItem[]>(
    LS_KEYS.globalSearch,
    [],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const cacheRef = useRef<Record<string, any>>({});
  const modal = useModal();

  const [queryResponse, setQueryResponse] = useState(null);

  const searchMutation = useMutation({
    mutationFn: (variables: { q: string }) => searchApi.search(variables),
    onError: (_, { q }) => {
      setQueryResponse(null);
    },
    onSuccess: (response, { q }) => {
      cacheRef.current[q] = response;

      setQueryResponse(response);
    },
  });

  const onSearch = useDebounceCallback(
    (value: string, event?: ChangeEvent<HTMLInputElement>) => {
      const q = value;

      let href = pathname;

      if (q) {
        href += `?q=${q}`;
      }

      router.push(href, {
        scroll: false,
      });

      if (!q?.length) {
        setQueryResponse(null);

        return;
      }

      if (cacheRef.current[q]) {
        setQueryResponse(cacheRef.current[q]);

        return;
      }

      searchMutation.mutate({ q });

      const setHistoryItems = new Set(storage.map(({ query }) => query));

      if (!setHistoryItems.has(q)) {
        setStorage((prev) => [...prev, { id: Date.now(), query: q }]);
      }
    },
    DEBOUNCE_TIME,
  );

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
  }

  useEffect(() => {
    const query = searchParams.get('q');

    if (query) {
      modal.show('global-search');

      if (inputRef.current && query) {
        inputRef.current.value = query;
        onSearch(query);
      }
    }
  }, []);

  return {
    clearHistory,
    clearInputValue,
    deleteHistoryItem,
    inputRef,
    onSearch,
    queryResponse,
    searchMutation,
    storage,
  };
};
