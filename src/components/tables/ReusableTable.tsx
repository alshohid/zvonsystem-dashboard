"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type RowRenderer<T> = (item: T, index: number) => ReactNode;
type RowClassName<T> = string | ((item: T, index: number) => string);

type ReusableTableProps<T> = {
  tableHeader: string[];
  items: T[];
  rowRenderers: RowRenderer<T>[];
  minTableWidthPx?: number;
  wrapperClassName?: string;
  tableClassName?: string;
  tableHeaderClassName?: string;
  tableBodyClassName?: string;
  headerCellClassName?: string;
  bodyCellClassName?: string;
  rowClassName?: RowClassName<T>;
  getRowKey?: (item: T, index: number) => string | number;
  isLoading?: boolean;
  emptyText?: string;
  loadingCellClassName?: string;
  emptyCellClassName?: string;
  onRowClick?: (item: T) => void;
};

export default function ReusableTable<T>({
  tableHeader,
  items,
  rowRenderers,
  minTableWidthPx = 1102,
  wrapperClassName = "",
  tableClassName = "",
  tableHeaderClassName = "",
  tableBodyClassName = "",
  headerCellClassName = "px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
  bodyCellClassName = "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
  rowClassName = "",
  getRowKey = (_, i) => i,
  isLoading = false,
  emptyText = "No data found",
  loadingCellClassName = "block px-5 py-6",
  emptyCellClassName = "block px-5 py-6",
  onRowClick,
}: ReusableTableProps<T>) {
  const colCount = tableHeader.length;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    didDrag: false,
    lockAxis: null as "horizontal" | "vertical" | null,
    isDragging: false,
  });
  const suppressClickRef = useRef(false);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const emptyRenderer: RowRenderer<T> = () => null;

  const safeRenderers: RowRenderer<T>[] =
    rowRenderers.length >= colCount
      ? rowRenderers.slice(0, colCount)
      : [
        ...rowRenderers,
        ...Array(colCount - rowRenderers.length).fill(emptyRenderer),
      ];

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const updateOverflowState = () => {
      setHasHorizontalOverflow(container.scrollWidth > container.clientWidth + 1);
    };

    updateOverflowState();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateOverflowState);

      return () => {
        window.removeEventListener("resize", updateOverflowState);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateOverflowState();
    });

    resizeObserver.observe(container);

    if (container.firstElementChild instanceof HTMLElement) {
      resizeObserver.observe(container.firstElementChild);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [items.length, minTableWidthPx, rowRenderers.length, tableHeader.length]);

  const finishDragging = () => {
    const container = scrollContainerRef.current;

    if (container && dragStateRef.current.pointerId !== -1) {
      try {
        container.releasePointerCapture(dragStateRef.current.pointerId);
      } catch {
        // noop
      }
    }

    if (dragStateRef.current.didDrag) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragStateRef.current = {
      pointerId: -1,
      startX: 0,
      startY: 0,
      startScrollLeft: 0,
      didDrag: false,
      lockAxis: null,
      isDragging: false,
    };

    setIsDragging(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const container = scrollContainerRef.current;

    if (!container || container.scrollWidth <= container.clientWidth) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: container.scrollLeft,
      didDrag: false,
      lockAxis: null,
      isDragging: true,
    };

    container.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    const dragState = dragStateRef.current;

    if (!container || !dragState.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (dragState.lockAxis == null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < 6 && absY < 6) {
        return;
      }

      dragStateRef.current.lockAxis = absX > absY ? "horizontal" : "vertical";
    }

    if (dragStateRef.current.lockAxis !== "horizontal") {
      return;
    }

    dragStateRef.current.didDrag = true;
    container.scrollLeft = dragState.startScrollLeft - deltaX;
    event.preventDefault();
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border-b-none border-gray-200 bg-white    ${wrapperClassName}`}>
      <div
        ref={scrollContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onPointerLeave={finishDragging}
        onClickCapture={handleClickCapture}
        className={[
          'max-w-full overflow-x-auto touch-pan-y',
          hasHorizontalOverflow ? 'cursor-grab' : '',
          isDragging ? 'cursor-grabbing select-none' : '',
        ].join(' ')}
      >
        <div style={{ minWidth: minTableWidthPx }}>
          <Table className={tableClassName}>
            <TableHeader
              className={[
                'border-b leading-3 border-gray-100 bg-[#F6F8FA] dark:bg-[#0b151d]',
                tableHeaderClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <TableRow>
                {tableHeader.map((header, idx) => (
                  <TableCell key={idx} isHeader className={headerCellClassName}>
                    <span className="text-[1rem] font-medium">{header}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody
              className={[
                'divide-y divide-gray-100 dark:divide-white/[0.05]',
                tableBodyClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={colCount}>
                    <span className={loadingCellClassName}>Loading...</span>
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colCount}>
                    <span className={emptyCellClassName}>{emptyText}</span>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => {
                  const isClickable = Boolean(onRowClick);
                  const resolvedRowClassName =
                    typeof rowClassName === 'function'
                      ? rowClassName(item, index)
                      : rowClassName;

                  return (
                    <TableRow
                      key={getRowKey(item, index)}
                      onClick={
                        isClickable ? () => onRowClick?.(item) : undefined
                      }
                      className={[
                        resolvedRowClassName,
                        isClickable
                          ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {safeRenderers.map((render, colIndex) => (
                        <TableCell key={colIndex} className={bodyCellClassName}>
                          {render(item, index)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
