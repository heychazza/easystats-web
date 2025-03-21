export interface PlayerCountStats {
  current: number;
  averages: {
    '24h': number;
    '7d': number;
    '14d': number;
    '30d': number;
  };
  peak_count: number;
  peak_time: string;
}

export interface PlatformStats {
  total: number;
  java: number;
  bedrock: number;
  player_count?: PlayerCountStats;
}

export interface RevenueStats {
  USD: number;
  EUR: number;
}

export interface SessionStats {
  average_time_seconds: number;
  average_time_formatted: string;
}

export interface JoinStats {
  total: number;
  java: number;
  bedrock: number;
}

export interface Campaign {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  currency: string;
  cost: number;
  total_revenue: number;
  profit?: number;
  roi?: number;
  status: 'active' | 'ended' | 'planned';
  hostnames: string[];
  join_stats?: JoinStats;
}

export interface StatsData {
  export_date: string;
  timeframe: string;
  timeframe_days: string;
  player_count?: PlayerCountStats;
  platform_stats: Record<string, PlatformStats>;
  revenue_stats: Record<string, RevenueStats>;
  session_stats: Record<string, SessionStats>;
  campaigns: Campaign[];
} 