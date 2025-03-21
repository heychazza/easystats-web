'use client';

import { useEffect, useState } from 'react';
import type { StatsData } from '@/types/stats';
import ChartWrapper from './ChartWrapper';

// Add a number formatting helper
const formatNumber = (num: number) => {
  const prefix = num < 0 ? '-' : '';
  return `${prefix}${new Intl.NumberFormat('en-US').format(Math.abs(num))}`;
};

interface Props {
  stats: StatsData;
  onReset: () => void;
}

export default function StatsVisualization({ stats, onReset }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const platformData = {
    labels: Object.keys(stats.platform_stats),
    datasets: [
      {
        label: 'Total',
        data: Object.values(stats.platform_stats).map((stat) => stat.total),
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
      },
      {
        label: 'Java',
        data: Object.values(stats.platform_stats).map((stat) => stat.java),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Bedrock',
        data: Object.values(stats.platform_stats).map((stat) => stat.bedrock),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      },
    ],
  };

  const revenueData = {
    labels: Object.keys(stats.revenue_stats),
    datasets: [
      {
        label: 'USD Revenue',
        data: Object.values(stats.revenue_stats).map((stat) => stat.USD),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
      {
        label: 'EUR Revenue',
        data: Object.values(stats.revenue_stats).map((stat) => stat.EUR),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
      },
    ],
  };

  const sessionData = {
    labels: Object.keys(stats.session_stats),
    datasets: [
      {
        label: 'Average Session Time (hours)',
        data: Object.values(stats.session_stats).map(
          (stat) => stat.average_time_seconds / 3600
        ),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const campaignData = {
    labels: stats.campaigns.map(campaign => campaign.name),
    datasets: [
      {
        label: 'Revenue',
        data: stats.campaigns.map(campaign => campaign.total_revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Cost',
        data: stats.campaigns.map(campaign => campaign.cost),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Total Joins',
        data: stats.campaigns.map(campaign => campaign.join_stats?.total || 0),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Java Joins',
        data: stats.campaigns.map(campaign => campaign.join_stats?.java || 0),
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Bedrock Joins',
        data: stats.campaigns.map(campaign => campaign.join_stats?.bedrock || 0),
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-100">
          EasyStats Visualization
        </h1>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          Upload New File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Count Overview */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Player Count Overview</h2>
          {stats.player_count ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Current Players</p>
                  <p className="text-2xl font-bold text-gray-100">{stats.player_count.current}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Peak Players</p>
                  <p className="text-2xl font-bold text-gray-100">{stats.player_count.peak_count}</p>
                  <p className="text-xs text-gray-500">{new Date(stats.player_count.peak_time).toLocaleString()}</p>
                </div>
              </div>
              <div className="h-[300px]">
                {isClient && (
                  <ChartWrapper
                    type="line"
                    data={{
                      labels: ['24h', '7d', '14d', '30d'],
                      datasets: [
                        {
                          label: 'Average Players',
                          data: [
                            stats.player_count.averages['24h'],
                            stats.player_count.averages['7d'],
                            stats.player_count.averages['14d'],
                            stats.player_count.averages['30d']
                          ],
                          borderColor: 'rgb(59, 130, 246)',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          tension: 0.1,
                          fill: true,
                        }
                      ]
                    }}
                    options={{
                      ...commonOptions,
                      scales: {
                        ...commonOptions.scales,
                        y: {
                          ...commonOptions.scales.y,
                          title: {
                            display: true,
                            text: 'Number of Players',
                            color: '#9CA3AF',
                          },
                          beginAtZero: true,
                        }
                      }
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center py-8">No player count data available</div>
          )}
        </div>

        {/* Server Player Counts */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Server Player Counts</h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(stats.platform_stats)
              .filter(([_, data]) => data.player_count)
              .map(([hostname, data]) => (
                <div key={hostname} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-200">{hostname}</h3>
                    <span className="text-sm text-gray-400">Current: {data.player_count?.current || 0}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">24h Avg</p>
                      <p className="text-gray-200">{data.player_count?.averages['24h'] || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">7d Avg</p>
                      <p className="text-gray-200">{data.player_count?.averages['7d'] || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">14d Avg</p>
                      <p className="text-gray-200">{data.player_count?.averages['14d'] || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">30d Avg</p>
                      <p className="text-gray-200">{data.player_count?.averages['30d'] || 0}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400">Peak</p>
                      <p className="text-gray-200">
                        {data.player_count?.peak_count || 0} at {data.player_count?.peak_time ? new Date(data.player_count.peak_time).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {Object.entries(stats.platform_stats).filter(([_, data]) => data.player_count).length === 0 && (
              <div className="text-gray-400 text-center py-4">No server player count data available</div>
            )}
          </div>
        </div>

        {/* Platform Distribution Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Platform Distribution</h2>
          <div className="h-[400px]">
            {isClient && (
              <ChartWrapper
                type="bar"
                data={platformData}
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    x: {
                      ...commonOptions.scales.x,
                      title: {
                        display: true,
                        text: 'Server Hostname',
                        color: '#9CA3AF',
                      },
                    },
                    y: {
                      ...commonOptions.scales.y,
                      title: {
                        display: true,
                        text: 'Number of Players',
                        color: '#9CA3AF',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Revenue by Platform</h2>
          <div className="h-[400px]">
            {isClient && (
              <ChartWrapper
                type="bar"
                data={revenueData}
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    x: {
                      ...commonOptions.scales.x,
                      title: {
                        display: true,
                        text: 'Server Hostname',
                        color: '#9CA3AF',
                      },
                    },
                    y: {
                      ...commonOptions.scales.y,
                      title: {
                        display: true,
                        text: 'Revenue Amount',
                        color: '#9CA3AF',
                      },
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => formatNumber(value as number),
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Session Duration Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Average Session Duration</h2>
          <div className="h-[400px]">
            {isClient && (
              <ChartWrapper
                type="line"
                data={sessionData}
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    x: {
                      ...commonOptions.scales.x,
                      title: {
                        display: true,
                        text: 'Server Hostname',
                        color: '#9CA3AF',
                      },
                    },
                    y: {
                      ...commonOptions.scales.y,
                      title: {
                        display: true,
                        text: 'Duration (Hours)',
                        color: '#9CA3AF',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Formatted Session Times:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.session_stats).map(([hostname, data]) => (
                <div key={hostname} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">{hostname}:</span>
                  <span className="text-sm font-medium text-gray-200">{data.average_time_formatted}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Performance Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Campaign Performance</h2>
          <div className="h-[400px] mb-6">
            {isClient && (
              <ChartWrapper
                type="bar"
                data={campaignData}
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    x: {
                      ...commonOptions.scales.x,
                      title: {
                        display: true,
                        text: 'Campaign Name',
                        color: '#9CA3AF',
                      },
                    },
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: {
                        display: true,
                        text: 'Amount in Currency',
                        color: '#9CA3AF',
                      },
                      beginAtZero: true,
                      grid: {
                        color: '#374151',
                      },
                      ticks: {
                        color: '#9CA3AF',
                        callback: (value) => formatNumber(value as number),
                      },
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: {
                        display: true,
                        text: 'Number of Joins',
                        color: '#9CA3AF',
                      },
                      beginAtZero: true,
                      grid: {
                        drawOnChartArea: false,
                        color: '#374151',
                      },
                      ticks: {
                        color: '#9CA3AF',
                        callback: (value) => formatNumber(value as number),
                      },
                    },
                  },
                }}
              />
            )}
          </div>
          
          {/* Campaign Details Table */}
          <div className="relative">
            <div className="text-sm text-gray-400 mb-2 flex items-center justify-between sticky top-0 bg-gray-900/50 backdrop-blur-sm z-10 py-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Scroll horizontally to view all columns
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-lg border border-gray-800 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campaign</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Period</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Currency</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ROI</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Servers</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Joins</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Java Joins</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bedrock Joins</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 bg-gray-900/30">
                      {stats.campaigns.map((campaign) => (
                        <tr key={campaign.name} className={`hover:bg-gray-800/30 transition-colors ${
                          campaign.status === 'ended' ? 'border-t border-b border-gray-700' : ''
                        }`}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-200">{campaign.name}</div>
                            <div className="text-sm text-gray-400">{campaign.description}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            {campaign.currency}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-red-400">
                            {formatNumber(campaign.cost)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-emerald-400">
                            {formatNumber(campaign.total_revenue)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className={typeof campaign.profit === 'number' && campaign.profit > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {typeof campaign.profit === 'number' ? formatNumber(campaign.profit) : '-'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className={typeof campaign.roi === 'number' && campaign.roi > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {typeof campaign.roi === 'number' ? `${formatNumber(campaign.roi)}%` : '-'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              campaign.status === 'active' 
                                ? 'bg-green-900/50 text-emerald-400' 
                                : 'bg-gray-800/50 text-gray-400'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <div className="flex flex-wrap gap-1">
                              {campaign.hostnames.map((hostname) => (
                                <span key={hostname} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-400">
                                  {hostname}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            {campaign.join_stats?.total ? formatNumber(campaign.join_stats.total) : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            {campaign.join_stats?.java ? formatNumber(campaign.join_stats.java) : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                            {campaign.join_stats?.bedrock ? formatNumber(campaign.join_stats.bedrock) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Export Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <p className="font-medium text-gray-400">Export Date</p>
            <p>{new Date(stats.export_date).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-400">Timeframe</p>
            <p>{stats.timeframe}</p>
          </div>
          <div>
            <p className="font-medium text-gray-400">Days</p>
            <p>{stats.timeframe_days}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 