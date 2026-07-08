'use client';

import { DateRangeType } from '@/src/types/dispatcher/type';
import GlobalDateFilter from '@/src/components/dispatcher/GlobalDateFilter';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
  type TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export interface RevenueTrendChartData {
  labels: string[];
  values: number[];
}

interface RevenueTrendChartProps {
  chartData: RevenueTrendChartData;
  filterValue?: DateRangeType;
  onFilterChange?: (value: DateRangeType) => void;
  title?: string;
}

export default function RevenueTrendChart({
  chartData,
  filterValue,
  onFilterChange,
  title = 'Revenue Trend',
}: RevenueTrendChartProps) {
  const getAreaGradient = (context: ScriptableContext<'line'>) => {
    const { ctx, chartArea } = context.chart;

    if (!chartArea) {
      return 'rgba(76, 132, 255, 0.18)';
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(76, 132, 255, 0.55)');
    gradient.addColorStop(0.2, 'rgba(76, 132, 255, 0.3)');
    gradient.addColorStop(0.5, 'rgba(76, 132, 255, 0.12)');
    gradient.addColorStop(1, 'rgba(76, 132, 255, 0)');
    return gradient;
  };

  const data: ChartData<'line', number[], string> = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: chartData.values,
        borderColor: '#4C84FF',
        backgroundColor: getAreaGradient,
        fill: true,
        tension: 0.45,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#4C84FF',
        pointBorderWidth: 0,
      },
    ],
  };

  const maxValue = Math.max(...chartData.values, 0);
  const yMax = maxValue === 0 ? 10000 : Math.ceil(maxValue / 10000) * 10000;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#2F3441',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const y = context.parsed.y ?? 0;
            return `Revenue  $${y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E8ECF4',
        },
        ticks: {
          color: '#8A94A6',
          font: {
            size: 11,
          },
        },
      },
      y: {
        min: 0,
        max: yMax,
        ticks: {
          stepSize: yMax / 4,
          color: '#8A94A6',
          font: {
            size: 11,
          },
          callback: (tickValue: string | number) => {
            return Number(tickValue).toLocaleString();
          },
        },
        grid: {
          color: '#E8ECF4',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1.5,
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[#E6EAF2] bg-white p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[1rem] font-medium text-[#1F2430]">{title}</h3>
        {filterValue && onFilterChange ? (
          <GlobalDateFilter value={filterValue} onChange={onFilterChange} />
        ) : null}
      </div>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
