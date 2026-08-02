"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryState(key: string, defaultValue: string) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const value = useMemo(
    () => sp.get(key) ?? defaultValue,
    [sp, key, defaultValue],
  );

  const setValue = useCallback(
    (next: string) => {
      const params = new URLSearchParams(sp.toString());
      params.set(key, next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, sp, key],
  );

  return [value, setValue] as const;
}

/**
 * Updates several params in one navigation. Calling `useQueryState` setters
 * back to back would drop all but the last change, since each one starts from
 * the same render's search params.
 */
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const get = useCallback(
    (key: string, defaultValue = "") => sp.get(key) ?? defaultValue,
    [sp],
  );

  const setMany = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(sp.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, sp],
  );

  return { get, setMany };
}
