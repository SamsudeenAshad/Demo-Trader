# 🏗️ TradeSim Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Web Browser                             │  │
│  │              (React + TypeScript + MUI)                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS + WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Port 5173)                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │   Pages    │  │ Components │  │   Redux    │  │ Services │  │
│  │            │  │            │  │   Store    │  │  (API)   │  │
│  │ - Home     │  │ - Header   │  │            │  │          │  │
│  │ - Login    │  │ - Sidebar  │  │ - Auth     │  │ - Auth   │  │
│  │ - Register │  │ - Chart    │  │ - Market   │  │ - Market │  │
│  │ - Dashboard│  │ - Order    │  │ - Orders   │  │ - Orders │  │
│  │ - Trading  │  │ - Portfolio│  │ - Portfolio│  │ - Socket │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API + WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BACKEND (Port 5000)                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │   Routes   │  │Controllers │  │  Services  │  │Middleware│  │
│  │            │  │            │  │            │  │          │  │
│  │ /auth      │  │ authCtrl   │  │ authSvc    │  │ - JWT    │  │
│  │ /markets   │  │ marketCtrl │  │ marketSvc  │  │ - CORS   │  │
│  │ /orders    │  │ orderCtrl  │  │ orderSvc   │  │ - Limit  │  │
│  │ /portfolio │  │portfolioCtl│  │portfolioSvc│  │ - Error  │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Socket.io Server                         │ │
│  │  - Real-time price updates                                  │ │
│  │  - Order execution notifications                            │ │
│  │  - Market data streaming                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │   Users    │  │   Orders   │  │ Positions  │  │  Trades  │  │
│  │            │  │            │  │            │  │          │  │
│  │ MongoDB    │  │ MongoDB    │  │ MongoDB    │  │ MongoDB  │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Binance   │  │   Alpha    │  │  Finnhub   │  │CoinGecko │  │
│  │    API     │  │  Vantage   │  │    API     │  │   API    │  │
│  │  (Crypto)  │  │  (Stocks)  │  │  (Market)  │  │ (Crypto) │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. User Authentication Flow

```
User → Login Form → POST /api/auth/login → Validate Credentials
                                          ↓
                                    Generate JWT Token
                                          ↓
                                    Return Token + User Data
                                          ↓
                                    Store in Redux + LocalStorage
                                          ↓
                                    Redirect to Dashboard
```

### 2. Trading Flow

```
User → Select Asset → View Chart → Place Order
                                       ↓
                                POST /api/orders
                                       ↓
                                Validate Order
                                       ↓
                            Check Virtual Balance
                                       ↓
                            Execute Order (Simulate)
                                       ↓
                            Update Portfolio & Balance
                                       ↓
                        WebSocket: Broadcast Order Filled
                                       ↓
                            Update UI in Real-time
```

### 3. Real-time Market Data Flow

```
External API → Backend Service → Cache → WebSocket Server
                                              ↓
                                    Broadcast to Subscribers
                                              ↓
                                Frontend Socket.io Client
                                              ↓
                                    Update Redux Store
                                              ↓
                                    Re-render Components
```

---

## Component Architecture

### Frontend Component Hierarchy

```
App
├── ThemeProvider
│   └── BrowserRouter
│       ├── PublicRoutes
│       │   ├── HomePage
│       │   ├── LoginPage
│       │   └── RegisterPage
│       │
│       └── PrivateRoutes (Protected)
│           └── Layout
│               ├── Header
│               │   ├── TickerTape
│               │   ├── UserMenu
│               │   └── Notifications
│               │
│               ├── Sidebar
│               │   ├── Navigation
│               │   └── QuickActions
│               │
│               └── Content
│                   ├── Dashboard
│                   │   ├── BalanceCard
│                   │   ├── PerformanceChart
│                   │   └── RecentTrades
│                   │
│                   ├── TradingPage
│                   │   ├── MarketList
│                   │   ├── TradingChart
│                   │   ├── OrderForm
│                   │   └── OrderBook
│                   │
│                   ├── PortfolioPage
│                   │   ├── PortfolioSummary
│                   │   ├── PositionsList
│                   │   └── PerformanceMetrics
│                   │
│                   └── LeaderboardPage
│                       ├── Rankings
│                       └── Challenges
```

---

## Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  username: string (unique),
  email: string (unique),
  password: string (hashed),
  firstName: string,
  lastName: string,
  virtualBalance: number (default: 100000),
  totalProfitLoss: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  symbol: string,
  type: enum ['market', 'limit', 'stop-loss', 'take-profit'],
  side: enum ['buy', 'sell'],
  quantity: number,
  price: number,
  status: enum ['open', 'filled', 'cancelled', 'partial'],
  filledQuantity: number,
  createdAt: Date,
  filledAt: Date
}
```

### Positions Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  symbol: string,
  quantity: number,
  entryPrice: number,
  currentPrice: number,
  profitLoss: number,
  profitLossPercentage: number,
  openedAt: Date,
  closedAt: Date
}
```

### Trades Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  symbol: string,
  side: enum ['buy', 'sell'],
  quantity: number,
  price: number,
  total: number,
  profitLoss: number,
  executedAt: Date
}
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
POST   /api/auth/logout      - Logout user
PUT    /api/auth/profile     - Update profile
```

### Markets

```
GET    /api/markets          - Get all available markets
GET    /api/markets/:symbol  - Get market details
GET    /api/markets/search   - Search markets
```

### Orders

```
POST   /api/orders           - Place new order
GET    /api/orders           - Get user's orders
GET    /api/orders/:id       - Get order details
PUT    /api/orders/:id       - Modify order
DELETE /api/orders/:id       - Cancel order
```

### Portfolio

```
GET    /api/portfolio        - Get user's portfolio
GET    /api/portfolio/positions - Get open positions
GET    /api/portfolio/history   - Get trade history
GET    /api/portfolio/performance - Get performance metrics
```

### Leaderboard

```
GET    /api/leaderboard      - Get rankings
GET    /api/challenges       - Get active challenges
POST   /api/challenges/:id/join - Join challenge
```

---

## WebSocket Events

### Client → Server

```typescript
// Subscribe to market data
socket.emit('subscribe', { symbol: 'BTCUSDT' });

// Unsubscribe from market data
socket.emit('unsubscribe', { symbol: 'BTCUSDT' });
```

### Server → Client

```typescript
// Price update
socket.on('price_update', (data: {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
}));

// Order filled
socket.on('order_filled', (data: {
  orderId: string;
  symbol: string;
  quantity: number;
  price: number;
}));

// Portfolio update
socket.on('portfolio_update', (data: Portfolio));
```

---

## Security Architecture

### Authentication & Authorization

```
Request → JWT Token → Verify → Extract User → Attach to Request → Next
          ↓ (if invalid)
       401 Unauthorized
```

### Data Validation

```
Request → Joi Schema → Validate → Process
          ↓ (if invalid)
       400 Bad Request
```

### Rate Limiting

```
IP Address → Rate Limiter → Check Limits → Allow/Block
                                ↓
                        100 requests/15 minutes
```

---

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION                            │
│                                                          │
│  Frontend (Vercel/Netlify)                              │
│  ├── CDN                                                │
│  ├── Auto SSL                                           │
│  └── Global Edge Network                               │
│                                                          │
│  Backend (Railway/Render/AWS)                           │
│  ├── Load Balancer                                      │
│  ├── Multiple Instances                                 │
│  ├── Auto Scaling                                       │
│  └── Health Checks                                      │
│                                                          │
│  Database (MongoDB Atlas)                               │
│  ├── Replica Sets                                       │
│  ├── Auto Backup                                        │
│  └── Geographic Distribution                            │
│                                                          │
│  Monitoring                                             │
│  ├── Error Tracking (Sentry)                           │
│  ├── Performance (New Relic)                           │
│  └── Logs (CloudWatch/Datadog)                        │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Decisions

### Why React?
- Component-based architecture
- Large ecosystem
- Excellent TypeScript support
- Virtual DOM for performance

### Why Material-UI?
- Production-ready components
- Customizable theme system
- Binance-style design achievable
- Good documentation

### Why Express.js?
- Simple and flexible
- Large middleware ecosystem
- Easy to scale
- TypeScript support

### Why MongoDB?
- Flexible schema for evolving features
- Good for real-time applications
- Easy horizontal scaling
- JSON-like documents

### Why Socket.io?
- Reliable WebSocket implementation
- Automatic fallbacks
- Room-based broadcasting
- Easy integration

---

This architecture provides a solid foundation for building a scalable, maintainable, and feature-rich demo trading platform! 🚀
