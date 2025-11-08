import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

function TickerTape() {
  const [tickers, setTickers] = useState<TickerData[]>([
    { symbol: 'BTC/USD', price: 43250.00, change: 1250.00, changePercent: 2.98 },
    { symbol: 'ETH/USD', price: 2280.50, change: -45.30, changePercent: -1.95 },
    { symbol: 'AAPL', price: 185.92, change: 2.15, changePercent: 1.17 },
    { symbol: 'GOOGL', price: 142.38, change: -0.82, changePercent: -0.57 },
    { symbol: 'TSLA', price: 242.84, change: 8.43, changePercent: 3.60 },
    { symbol: 'EUR/USD', price: 1.0875, change: 0.0012, changePercent: 0.11 },
    { symbol: 'GOLD', price: 2048.50, change: -12.30, changePercent: -0.60 },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((ticker) => {
          const change = (Math.random() - 0.5) * ticker.price * 0.001;
          const newPrice = ticker.price + change;
          const newChange = ticker.change + change;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;

          return {
            ...ticker,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        height: 40,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          animation: 'scroll 30s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {/* Duplicate tickers for seamless loop */}
        {[...tickers, ...tickers].map((ticker, index) => (
          <Box
            key={`${ticker.symbol}-${index}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              borderRight: '1px solid',
              borderColor: 'divider',
              minWidth: 200,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {ticker.symbol}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontSize: '0.85rem',
              }}
            >
              ${ticker.price.toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: ticker.change >= 0 ? 'success.main' : 'error.main',
              }}
            >
              {ticker.change >= 0 ? (
                <TrendingUpIcon sx={{ fontSize: 16 }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16 }} />
              )}
              <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                {ticker.changePercent >= 0 ? '+' : ''}
                {ticker.changePercent.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TickerTape;
