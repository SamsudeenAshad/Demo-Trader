# 🚀 TradeSim Setup Guide

Welcome to TradeSim! This guide will help you set up the project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/SamsudeenAshad/Demo-Trader.git
cd Demo-Trader
```

### Step 2: Install Root Dependencies

```bash
npm install
```

### Step 3: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tradesim
# Or use MongoDB Atlas (recommended):
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tradesim

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# API Keys (Optional)
ALPHA_VANTAGE_API_KEY=your_key_here
FINNHUB_API_KEY=your_key_here

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Initial Balance
INITIAL_BALANCE=100000
```

### Step 4: Setup Frontend

```bash
cd ../frontend
npm install
```

### Step 5: Start Development Servers

#### Option A: Run Both Servers Together (from root directory)

```bash
cd ..
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Frontend on http://localhost:5173

#### Option B: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows:** MongoDB should start automatically as a service
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

3. Verify connection:
   ```bash
   mongo
   # or
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (Free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

## Getting API Keys (Optional but Recommended)

### Alpha Vantage (Stock Market Data)
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get a free API key
3. Add to `ALPHA_VANTAGE_API_KEY` in `.env`

### Finnhub (Alternative Market Data)
1. Visit [Finnhub](https://finnhub.io/register)
2. Sign up for free account
3. Get API key from dashboard
4. Add to `FINNHUB_API_KEY` in `.env`

### Binance API (For Crypto Data)
1. Visit [Binance API](https://www.binance.com/en/binance-api)
2. No API key needed for public market data
3. Used directly in the application

## Troubleshooting

### PowerShell Script Execution Error

If you see "scripts is disabled on this system" error:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use

If ports 5000 or 5173 are already in use:

**Change Backend Port:**
- Edit `backend/.env` and change `PORT=5000` to another port

**Change Frontend Port:**
- Edit `frontend/vite.config.ts` and change the port in server configuration

### MongoDB Connection Error

1. Ensure MongoDB is running
2. Check your connection string in `.env`
3. Verify network connectivity (for Atlas)
4. Check firewall settings

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for backend and frontend
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
Demo-Trader/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   ├── theme.ts       # MUI theme configuration
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── server.ts      # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── TASKS.md              # Development tasks
├── SETUP.md              # This file
├── README.md             # Project overview
└── package.json          # Root package.json
```

## Next Steps

1. ✅ Complete the setup above
2. 📝 Check [TASKS.md](./TASKS.md) for development roadmap
3. 🎨 Start building features!
4. 📚 Read component documentation as you go

## Development Workflow

1. Create a new branch for features:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and test locally

3. Commit with clear messages:
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

4. Push and create pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## Useful Commands

```bash
# Root directory
npm run dev              # Start both servers
npm run build            # Build both projects
npm run install:all      # Install all dependencies

# Backend
cd backend
npm run dev              # Start backend server
npm run build            # Build backend
npm start                # Start production server

# Frontend
cd frontend
npm run dev              # Start frontend dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Resources

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

If you encounter any issues:
1. Check this setup guide
2. Look at the troubleshooting section
3. Check existing issues on GitHub
4. Create a new issue with details

---

Happy Coding! 🚀
