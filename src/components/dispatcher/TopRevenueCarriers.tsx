'use client';

export interface TopRevenueCarrierItem {
  amount: string;
  amountSuffix?: string;
  id: string;
  metricLabel: string;
  name: string;
  plan: string;
  rank: string;
}

interface TopRevenueCarriersProps {
  carriers: TopRevenueCarrierItem[];
  title?: string;
}

export default function TopRevenueCarriers({
  carriers,
  title = 'Top Revenue Carriers',
}: TopRevenueCarriersProps) {
  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <h3 className="text-[24px] font-semibold text-[#1F2430] mb-4">
        {title}
      </h3>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {carriers.map(carrier => (
          <div
            key={carrier.id}
            className="flex items-center justify-between rounded-xl bg-[#F5F6FA] px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8ECF5] text-xs font-semibold text-[#2e3a83]">
                {carrier.rank}
              </div>

              <div>
                <p className="text-sm font-medium text-[#1F2430]">
                  {carrier.name}
                </p>
                <p className="text-xs text-[#8A94A6]">{carrier.plan}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[15px] font-semibold text-[#1F2430]">
                {carrier.amount}
                {carrier.amountSuffix ? (
                  <>
                    {' '}
                    <span className="text-xs font-normal text-[#8A94A6]">
                      /{carrier.amountSuffix}
                    </span>
                  </>
                ) : null}
              </p>
              <p className="text-xs text-[#8A94A6]">{carrier.metricLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
