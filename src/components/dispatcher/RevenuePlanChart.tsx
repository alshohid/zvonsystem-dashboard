'use client';

import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip);

export interface RevenuePlanChartItem {
  color: string;
  label: string;
  value: number;
  valueLabel?: string;
}

interface RevenuePlanChartProps {
  items: RevenuePlanChartItem[];
  title?: string;
}

export default function RevenuePlanChart({
  items,
  title = 'Revenue by Plan',
}: RevenuePlanChartProps) {
  const chartData = items.map(item => item.value);
  const chartColors = items.map(item => item.color);
  const chartLabels = items.map(item => item.label);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '62%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2F3441',
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <h3 className="mb-5 mt-5 text-center text-[1rem] font-medium text-[#1F2430]">
        {title}
      </h3>

      <div className="mx-auto h-auto w-[180px]">
        <Doughnut data={data} options={options} />
      </div>

      <div className="mx-auto mt-6 flex w-[180px] flex-col justify-center space-y-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#5C6578]">
              <span
                className="h-2.5 w-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </div>
            <span className="text-sm font-semibold text-[#1F2430]">
              {item.valueLabel ?? `${item.value}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
