"use client";

import { useQueryState } from "@/src/lib/helper/useQueryState";

export function useTabsQueryState<T extends string>(
  queryKey: string,
  defaultKey: T,
) {
  const [value, setValue] = useQueryState(queryKey, defaultKey);
  return [value as T, (k: T) => setValue(k)] as const;
}
