# TradeSim Backend API

Backend server for the TradeSim demo trading platform.

## Features

- RESTful API with Express.js
- WebSocket support for real-time data
- JWT authentication
- MongoDB database
- TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
- Set your MongoDB connection string
- Set JWT secret
- Add API keys for market data providers (optional)

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Authentication (Coming Soon)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Trading (Coming Soon)
- `GET /api/markets` - Get available markets
- `GET /api/markets/:symbol` - Get market details
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user orders
- `DELETE /api/orders/:id` - Cancel order

### Portfolio (Coming Soon)
- `GET /api/portfolio` - Get user portfolio
- `GET /api/portfolio/history` - Get trade history

## WebSocket Events

### Client -> Server
- `subscribe` - Subscribe to market data for a symbol
- `unsubscribe` - Unsubscribe from market data

### Server -> Client
- `price_update` - Real-time price updates
- `order_filled` - Order execution notification

## Project Structure

```
backend/
├── src/
│   ├── server.ts         # Main server file
│   ├── config/           # Configuration files
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── .env.example          # Environment variables template
├── package.json
└── tsconfig.json
```

## Development

```bash
npm run dev     # Start development server with hot reload
npm run build   # Build for production
npm start       # Start production server
```
