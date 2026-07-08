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
