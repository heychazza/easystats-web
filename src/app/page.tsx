'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import type { StatsData } from '@/types/stats';
import StatsVisualization from '@/components/StatsVisualization';

const statsSchema = z.object({
  export_date: z.string(),
  timeframe: z.string(),
  timeframe_days: z.string(),
  player_count: z.object({
    current: z.number(),
    averages: z.object({
      '24h': z.number(),
      '7d': z.number(),
      '14d': z.number(),
      '30d': z.number(),
    }),
    peak_count: z.number(),
    peak_time: z.string(),
  }).optional(),
  platform_stats: z.record(z.object({
    total: z.number(),
    java: z.number(),
    bedrock: z.number(),
    player_count: z.object({
      current: z.number(),
      averages: z.object({
        '24h': z.number(),
        '7d': z.number(),
        '14d': z.number(),
        '30d': z.number(),
      }),
      peak_count: z.number(),
      peak_time: z.string(),
    }).optional(),
  })),
  revenue_stats: z.record(z.object({
    USD: z.number(),
    EUR: z.number(),
  })),
  session_stats: z.record(z.object({
    average_time_seconds: z.number(),
    average_time_formatted: z.string(),
  })),
  campaigns: z.array(z.object({
    name: z.string(),
    description: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    currency: z.string(),
    cost: z.number(),
    total_revenue: z.number(),
    profit: z.number().optional(),
    roi: z.number().optional(),
    status: z.enum(['active', 'ended', 'planned']),
    hostnames: z.array(z.string()),
    join_stats: z.object({
      total: z.number(),
      java: z.number(),
      bedrock: z.number(),
    }).optional(),
  })),
});

export default function Home() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const text = await file.text();
      const json = JSON.parse(text);
      
      const validatedData = statsSchema.parse(json);
      setStats(validatedData);
      setError(null);
    } catch (err) {
      setError('Invalid file format. Please upload a valid EasyStats JSON file.');
      setStats(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  if (stats) {
    return <StatsVisualization stats={stats} onReset={() => setStats(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-100 tracking-tight">
            EasyStats Visualizer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your Minecraft server statistics into beautiful, interactive visualizations
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            relative group cursor-pointer
            border-2 border-dashed rounded-xl p-12
            transition-all duration-300 ease-in-out
            ${isDragging 
              ? 'border-blue-500 bg-blue-500/10 scale-102 border-opacity-70' 
              : 'border-gray-600 hover:border-blue-500 hover:bg-gray-800/50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-6">
            <div className="relative">
              <div className={`
                transform transition-transform duration-300
                ${isDragging ? 'scale-110' : 'group-hover:scale-105'}
              `}>
                <svg
                  className={`w-20 h-20 mx-auto mb-4 transition-colors duration-300 ${
                    isDragging ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <p className={`text-xl font-medium transition-colors duration-300 ${
                isDragging ? 'text-blue-400' : 'text-gray-300'
              }`}>
                {isDragActive ? "Drop your JSON file here..." : "Drag and drop your EasyStats JSON file"}
              </p>
              <p className="text-sm text-gray-500">
                or click to select from your computer
              </p>
            </div>
          </div>

          {/* Animated border effect */}
          <div className={`
            absolute inset-0 rounded-xl transition-opacity duration-300
            bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600
            opacity-0 group-hover:opacity-10
          `} />
        </div>

        {error && (
          <div className="relative transform transition-all duration-300 ease-out">
            <div className="bg-red-900/50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8">
          <p className="text-sm text-gray-500">
            Supported format: JSON export from EasyStats Minecraft plugin
          </p>
        </div>
      </div>
    </div>
  );
} 