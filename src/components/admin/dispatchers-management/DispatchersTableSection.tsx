"use client";

import DispatchersTable, {
  type DispatchersTableProps,
  type DispatcherRecord,
} from "./DispatchersTable";

export type { DispatcherRecord };

export default function DispatchersTableSection(
  props: DispatchersTableProps,
) {
  return <DispatchersTable {...props} />;
}
