'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useDebouncedValue } from '@/src/lib/helper/useDebouncedValue';
import { useQueryParams } from '@/src/lib/helper/useQueryState';
import { useGetAllReleasesQuery } from '@/src/redux/features/releases/releasesApi';
import ReleaseGridSection from './ReleaseGridSection';

const PAGE_SIZE = 12;

export default function AllReleasesContainer({
    detailsBasePath = '/admin/dashboard/releases',
}: {
    detailsBasePath?: string;
}) {
    const { get, setMany } = useQueryParams();

    const page = Math.max(Number(get('page', '1')) || 1, 1);
    const search = get('search');

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebouncedValue(searchInput);

    useEffect(() => {
        if (debouncedSearch === search) return;
        setMany({ search: debouncedSearch, page: '1' });
    }, [debouncedSearch, search, setMany]);

    const { data, isLoading, isFetching, isError, error } = useGetAllReleasesQuery({
        search: search || undefined,
        page,
        limit: PAGE_SIZE,
    });

    const releases = data?.data ?? [];
    const meta = data?.meta;

    const buildHref = (id: string) => {
        const params = new URLSearchParams({ from: 'all', page: String(page) });
        if (search) params.set('search', search);
        return `${detailsBasePath}/${id}?${params.toString()}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
                        Releases
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
                        All Releases
                    </h1>
                </div>

                <SearchInput
                    value={searchInput}
                    onChange={event => setSearchInput(event.target.value)}
                    placeholder="Search by release name or UPC"
                    containerClassName="w-full sm:max-w-sm"
                />
            </div>

            <ReleaseGridSection
                releases={releases}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                error={error}
                page={page}
                pageSize={PAGE_SIZE}
                totalItems={meta?.total ?? releases.length}
                totalPages={meta?.totalPages ?? 1}
                onPageChange={next => setMany({ page: String(next) })}
                buildHref={release => buildHref(release.id)}
                emptyTitle={search ? 'No matching releases' : 'No live releases yet'}
                emptyMessage={
                    search
                        ? 'Try a different release name or UPC.'
                        : 'Approved releases appear here once they go live on the platform.'
                }
            />
        </div>
    );
}
