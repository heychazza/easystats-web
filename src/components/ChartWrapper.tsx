'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ChartData, ChartOptions } from 'chart.js';

// Dynamically import chart components with no SSR
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

interface ChartWrapperProps {
  type: 'bar' | 'line' | 'doughnut';
  data: ChartData<'bar' | 'line' | 'doughnut'>;
  options?: ChartOptions<'bar' | 'line' | 'doughnut'>;
}

export default function ChartWrapper({ type, data, options }: ChartWrapperProps) {
  useEffect(() => {
    // Import and configure Chart.js on the client side
    import('chart.js/auto').then(({ Chart }) => {
      Chart.defaults.color = '#9CA3AF';
      Chart.defaults.borderColor = '#374151';
    });
  }, []);

  switch (type) {
    case 'bar':
      return <Bar data={data as ChartData<'bar'>} options={options as ChartOptions<'bar'>} />;
    case 'line':
      return <Line data={data as ChartData<'line'>} options={options as ChartOptions<'line'>} />;
    case 'doughnut':
      return <Doughnut data={data as ChartData<'doughnut'>} options={options as ChartOptions<'doughnut'>} />;
    default:
      return null;
  }
} 