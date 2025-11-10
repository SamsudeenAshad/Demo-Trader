# 🌐 Market Data Integration Guide - Phase 5

**Goal:** Replace mock ticker data with real-time market prices from Binance (crypto) and Alpha Vantage (stocks).

---

## 🎯 Phase 5 Objectives

1. ✅ Set up Binance API for cryptocurrency data
2. ✅ Set up Alpha Vantage API for stock data
3. ✅ Create backend market data service
4. ✅ Implement WebSocket for real-time updates
5. ✅ Update TickerTape component with live data
6. ✅ Build markets page with asset list
7. ✅ Add error handling and reconnection logic

---

## 📋 Prerequisites

- ✅ Backend server running (localhost:5000)
- ✅ Frontend server running (localhost:5173)
- ✅ MongoDB connected
- 🔲 Binance API key (optional for public data)
- 🔲 Alpha Vantage API key (required, free)

---

## 1️⃣ Binance API Setup

### Register for API Access (Optional)
> **Note:** Binance public endpoints don't require authentication for market data!

1. Go to https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072
2. Create account (no KYC required for API)
3. Generate API key (read-only permissions)
4. Save API key and secret

### API Endpoints We'll Use

#### Get Current Price (REST)
```
GET https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
Response: { "symbol": "BTCUSDT", "price": "43250.00" }
```

#### Get 24h Stats (REST)
```
GET https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
Response: {
  "symbol": "BTCUSDT",
  "priceChange": "500.00",
  "priceChangePercent": "1.17",
  "lastPrice": "43250.00",
  "highPrice": "43800.00",
  "lowPrice": "42500.00",
  "volume": "12345.67"
}
```

#### WebSocket Stream (Real-time)
```
wss://stream.binance.com:9443/ws/btcusdt@ticker
Message: {
  "s": "BTCUSDT",
  "c": "43250.00",  // Current price
  "p": "500.00",    // Price change
  "P": "1.17",      // Price change percent
  ...
}
```

### Supported Crypto Pairs
- `BTCUSDT` - Bitcoin
- `ETHUSDT` - Ethereum
- `BNBUSDT` - Binance Coin
- `ADAUSDT` - Cardano
- `SOLUSDT` - Solana
- `XRPUSDT` - Ripple
- `DOGEUSDT` - Dogecoin

**Rate Limits:**
- REST: 2400 requests/minute (40/second)
- WebSocket: No hard limit, recommended max 1024 streams

---

## 2️⃣ Alpha Vantage API Setup

### Get Free API Key (Required)
1. Go to https://www.alphavantage.co/support/#api-key
2. Enter your email
3. Copy API key (format: `ABC123XYZ456`)
4. Free tier: **25 requests per day** (upgrade for more)

### API Endpoints We'll Use

#### Get Current Price (REST)
```
GET https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_API_KEY
Response: {
  "Global Quote": {
    "01. symbol": "AAPL",
    "05. price": "178.25",
    "09. change": "2.50",
    "10. change percent": "1.42%",
    ...
  }
}
```

#### Get Intraday Data (REST)
```
GET https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=YOUR_API_KEY
```

#### Get Forex (REST)
```
GET https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=YOUR_API_KEY
Response: {
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": "EUR",
    "3. To_Currency Code": "USD",
    "5. Exchange Rate": "1.0985",
    ...
  }
}
```

### Supported Assets
- **Stocks:** AAPL, GOOGL, TSLA, MSFT, AMZN, META, NVDA
- **Forex:** EUR/USD, GBP/USD, USD/JPY, AUD/USD
- **Commodities:** Limited (use alternative API)

**Rate Limits:**
- Free: 25 requests/day, 5/minute
- Premium: Up to 1200 requests/minute

---

## 3️⃣ Backend Implementation

### Step 1: Install Dependencies
```powershell
cd backend
npm install axios ws
```

### Step 2: Update Environment Variables
```env
# backend/.env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# API Keys
BINANCE_API_KEY=optional_for_public_endpoints
BINANCE_API_SECRET=optional_for_public_endpoints
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
```

### Step 3: Create Market Data Service
```typescript
// backend/src/services/marketDataService.ts
import axios from 'axios';
import WebSocket from 'ws';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
}

class MarketDataService {
  private binanceWs: WebSocket | null = null;
  private alphaVantageKey: string;
  private subscribers: Set<(data: TickerData) => void> = new Set();

  constructor() {
    this.alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY || '';
  }

  // Binance - Get crypto price
  async getBinancePrice(symbol: string): Promise<TickerData> {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`
    );
    return {
      symbol: `${symbol}/USD`,
      price: parseFloat(response.data.lastPrice),
      change: parseFloat(response.data.priceChange),
      changePercent: parseFloat(response.data.priceChangePercent),
      volume: parseFloat(response.data.volume)
    };
  }

  // Alpha Vantage - Get stock price
  async getStockPrice(symbol: string): Promise<TickerData> {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageKey}`
    );
    const quote = response.data['Global Quote'];
    return {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    };
  }

  // Alpha Vantage - Get forex rate
  async getForexRate(from: string, to: string): Promise<TickerData> {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${this.alphaVantageKey}`
    );
    const rate = response.data['Realtime Currency Exchange Rate'];
    return {
      symbol: `${from}/${to}`,
      price: parseFloat(rate['5. Exchange Rate']),
      change: 0, // Alpha Vantage doesn't provide change for forex
      changePercent: 0
    };
  }

  // WebSocket - Subscribe to Binance real-time updates
  subscribeBinanceTicker(symbols: string[], callback: (data: TickerData) => void) {
    const streams = symbols.map(s => `${s.toLowerCase()}usdt@ticker`).join('/');
    this.binanceWs = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    this.binanceWs.on('message', (data: string) => {
      const message = JSON.parse(data);
      if (message.data) {
        const ticker: TickerData = {
          symbol: message.data.s.replace('USDT', '/USD'),
          price: parseFloat(message.data.c),
          change: parseFloat(message.data.p),
          changePercent: parseFloat(message.data.P),
          volume: parseFloat(message.data.v)
        };
        callback(ticker);
      }
    });

    this.binanceWs.on('error', (error) => {
      console.error('Binance WebSocket error:', error);
    });

    this.binanceWs.on('close', () => {
      console.log('Binance WebSocket closed, reconnecting...');
      setTimeout(() => this.subscribeBinanceTicker(symbols, callback), 5000);
    });
  }

  // Get all ticker data
  async getAllTickers(): Promise<TickerData[]> {
    try {
      const [btc, eth, aapl, googl, tsla, eurusd] = await Promise.all([
        this.getBinancePrice('BTC'),
        this.getBinancePrice('ETH'),
        this.getStockPrice('AAPL'),
        this.getStockPrice('GOOGL'),
        this.getStockPrice('TSLA'),
        this.getForexRate('EUR', 'USD')
      ]);
      return [btc, eth, aapl, googl, tsla, eurusd];
    } catch (error) {
      console.error('Error fetching ticker data:', error);
      throw error;
    }
  }

  disconnect() {
    if (this.binanceWs) {
      this.binanceWs.close();
    }
  }
}

export default new MarketDataService();
```

### Step 4: Create API Routes
```typescript
// backend/src/routes/market.ts
import express from 'express';
import marketDataService from '../services/marketDataService';

const router = express.Router();

// GET /api/market/tickers - Get all ticker data
router.get('/tickers', async (req, res) => {
  try {
    const tickers = await marketDataService.getAllTickers();
    res.json({ success: true, data: tickers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch market data' });
  }
});

// GET /api/market/crypto/:symbol - Get specific crypto price
router.get('/crypto/:symbol', async (req, res) => {
  try {
    const data = await marketDataService.getBinancePrice(req.params.symbol.toUpperCase());
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch crypto data' });
  }
});

// GET /api/market/stock/:symbol - Get specific stock price
router.get('/stock/:symbol', async (req, res) => {
  try {
    const data = await marketDataService.getStockPrice(req.params.symbol.toUpperCase());
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stock data' });
  }
});

export default router;
```

### Step 5: Add WebSocket to Server
```typescript
// backend/src/server.ts (add to existing)
import { Server } from 'socket.io';
import http from 'http';
import marketDataService from './services/marketDataService';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Subscribe to real-time ticker updates
  socket.on('subscribe-tickers', (symbols: string[]) => {
    marketDataService.subscribeBinanceTicker(symbols, (data) => {
      socket.emit('ticker-update', data);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Register market routes
app.use('/api/market', marketRoutes);
```

---

## 4️⃣ Frontend Implementation

### Step 1: Install Dependencies
```powershell
cd frontend
npm install socket.io-client
```

### Step 2: Create Market Data Hook
```typescript
// frontend/src/hooks/useMarketData.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export const useMarketData = () => {
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Subscribe to ticker updates
    newSocket.emit('subscribe-tickers', ['BTC', 'ETH', 'BNB']);

    // Listen for updates
    newSocket.on('ticker-update', (data: TickerData) => {
      setTickers(prev => {
        const index = prev.findIndex(t => t.symbol === data.symbol);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    });

    // Fetch initial data
    fetch('http://localhost:5000/api/market/tickers')
      .then(res => res.json())
      .then(data => setTickers(data.data));

    return () => {
      newSocket.close();
    };
  }, []);

  return { tickers, socket };
};
```

### Step 3: Update TickerTape Component
```typescript
// frontend/src/components/TickerTape.tsx (replace)
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useMarketData } from '../hooks/useMarketData';

const TickerTape = () => {
  const { tickers } = useMarketData();

  return (
    <Box sx={{ 
      bgcolor: '#1E2329', 
      borderBottom: '1px solid #2B3139',
      overflow: 'hidden',
      height: { xs: '50px', sm: '60px' }
    }}>
      <Box sx={{
        display: 'flex',
        gap: 4,
        px: 2,
        py: 1.5,
        animation: 'scroll 30s linear infinite',
        '@keyframes scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }}>
        {[...tickers, ...tickers].map((ticker, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
            <Typography variant="body2" sx={{ color: '#EAECEF', fontWeight: 600 }}>
              {ticker.symbol}
            </Typography>
            <Typography variant="body2" sx={{ color: '#EAECEF' }}>
              ${ticker.price.toFixed(2)}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: ticker.change >= 0 ? '#0ECB81' : '#F6465D'
            }}>
              {ticker.change >= 0 ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
              <Typography variant="caption">
                {ticker.changePercent > 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TickerTape;
```

---

## 5️⃣ Testing

### Test REST Endpoints
```powershell
# Get all tickers
curl http://localhost:5000/api/market/tickers

# Get Bitcoin price
curl http://localhost:5000/api/market/crypto/BTC

# Get Apple stock price
curl http://localhost:5000/api/market/stock/AAPL
```

### Test WebSocket
1. Open browser console at http://localhost:5173
2. Check Network tab → WS (WebSocket)
3. Should see connection to `localhost:5000`
4. Should see ticker-update messages streaming

### Test TickerTape
1. Login to dashboard
2. Watch ticker tape at top
3. Prices should update in real-time
4. Green/red colors should match price changes

---

## 6️⃣ Error Handling

### Rate Limiting
```typescript
// Cache responses to reduce API calls
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### WebSocket Reconnection
```typescript
// Auto-reconnect on disconnect
ws.on('close', () => {
  console.log('WebSocket closed, reconnecting in 5s...');
  setTimeout(() => connectWebSocket(), 5000);
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
  ws.close();
});
```

### Fallback Data
```typescript
// Use mock data if API fails
try {
  const data = await fetchRealData();
  return data;
} catch (error) {
  console.error('API failed, using mock data');
  return getMockData();
}
```

---

## 📊 Expected Outcome

### Before (Mock Data)
- Prices update randomly every 3 seconds
- No connection to real markets
- Static list of 7 assets

### After (Live Data)
- Real-time prices from Binance (crypto)
- Real stock prices from Alpha Vantage
- Live updates via WebSocket
- Accurate price changes and percentages
- Expandable to 100+ assets

---

## 🎯 Next Steps After API Integration

1. **Build Markets Page**
   - Display all available assets in a table
   - Add search and filter functionality
   - Show 24h volume, high, low

2. **Create Asset Detail Page**
   - Full asset information
   - Price chart (TradingView Lightweight Charts)
   - Order form (buy/sell)
   - Order book (bids/asks)

3. **Implement Trading**
   - Place market orders
   - Place limit orders
   - Update user virtual balance
   - Record trades in database

---

## 🔧 Troubleshooting

### Issue: Alpha Vantage rate limit exceeded
**Solution:** Implement caching, reduce update frequency, or upgrade plan

### Issue: WebSocket keeps disconnecting
**Solution:** Check firewall, implement reconnection logic, verify CORS settings

### Issue: Prices not updating in TickerTape
**Solution:** Check browser console for errors, verify WebSocket connection, check API responses

### Issue: CORS errors
**Solution:** Add frontend URL to backend CORS whitelist

---

## 📚 Resources

- **Binance API Docs:** https://binance-docs.github.io/apidocs/spot/en/
- **Alpha Vantage Docs:** https://www.alphavantage.co/documentation/
- **Socket.io Docs:** https://socket.io/docs/v4/
- **WebSocket MDN:** https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

---

**Status:** 📝 Ready to implement  
**Estimated Time:** 4-6 hours  
**Difficulty:** Medium

**Let's get real market data flowing! 🚀**
