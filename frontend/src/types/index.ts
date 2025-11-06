export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  virtualBalance: number;
  createdAt: Date;
}

export interface Asset {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex' | 'commodity' | 'index';
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  volume24h?: number;
  marketCap?: number;
}

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  type: 'market' | 'limit' | 'stop-loss' | 'take-profit';
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'open' | 'filled' | 'cancelled' | 'partial';
  createdAt: Date;
  filledAt?: Date;
}

export interface Position {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
  openedAt: Date;
}

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  profitLoss?: number;
  executedAt: Date;
}

export interface Portfolio {
  totalValue: number;
  cashBalance: number;
  investedAmount: number;
  profitLoss: number;
  profitLossPercentage: number;
  positions: Position[];
}

export interface PerformanceMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageProfit: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number;
  sharpeRatio?: number;
}
