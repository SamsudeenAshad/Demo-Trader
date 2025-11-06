# 🚀 Quick Start Guide - TradeSim

Get up and running with TradeSim in 5 minutes!

## Prerequisites Check

```powershell
# Check Node.js version (should be v18+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## Installation (PowerShell)

### Option 1: Automated Installation (Recommended)

```powershell
# Run the installation script
.\install.ps1
```

### Option 2: Manual Installation

```powershell
# 1. Install root dependencies
npm install

# 2. Install backend dependencies
cd backend
npm install
cp .env.example .env
cd ..

# 3. Install frontend dependencies
cd frontend
npm install
cd ..
```

## Configuration

### 1. Setup MongoDB

**Option A: MongoDB Atlas (Cloud - Easiest)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a free cluster
4. Get connection string
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tradesim
   ```

**Option B: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default connection in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tradesim
   ```

### 2. Edit Environment Variables

Open `backend/.env` and update:

```env
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_min_32_characters

# Optional (for real market data)
ALPHA_VANTAGE_API_KEY=your_key
FINNHUB_API_KEY=your_key
```

## Running the Application

### Start Both Servers (Recommended)

```powershell
# From project root
npm run dev
```

This starts:
- ✅ Backend API: http://localhost:5000
- ✅ Frontend: http://localhost:5173

### Start Servers Separately

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## Verify Installation

1. Open browser to http://localhost:5173
2. You should see the TradeSim homepage
3. Check backend: http://localhost:5000/api/health

## First Steps

1. **Register an account**
   - Click "Get Started" on homepage
   - Fill in registration form
   - Get $100,000 virtual money

2. **Explore the platform**
   - View dashboard
   - Browse available assets
   - Check market data

3. **Make your first trade**
   - Select an asset
   - Place a market or limit order
   - Track your position

## Troubleshooting

### Issue: PowerShell Script Error

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Port Already in Use

Change ports in configuration:
- Backend: Edit `backend/.env` → `PORT=5001`
- Frontend: Edit `frontend/vite.config.ts` → `port: 5174`

### Issue: MongoDB Connection Failed

1. Check if MongoDB is running
2. Verify connection string in `.env`
3. For Atlas: Whitelist your IP address

### Issue: Module Not Found

```powershell
# Clear and reinstall
rm -r node_modules, package-lock.json
npm install

# Same for backend and frontend
cd backend
rm -r node_modules, package-lock.json
npm install

cd ..\frontend
rm -r node_modules, package-lock.json
npm install
```

## Development Commands

```powershell
# Development
npm run dev              # Run both servers
npm run dev:backend      # Run backend only
npm run dev:frontend     # Run frontend only

# Building
npm run build            # Build both
npm run build:backend    # Build backend
npm run build:frontend   # Build frontend

# Production
npm start                # Start production servers
```

## Project URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

## Key Features to Try

- ✨ Real-time price updates
- 📊 Interactive trading charts
- 💰 Virtual portfolio management
- 📈 Performance tracking
- 🏆 Leaderboard rankings
- 🎯 Trading challenges

## Next Steps

1. ✅ Complete initial setup
2. 📖 Read [SETUP.md](./SETUP.md) for detailed configuration
3. 📝 Check [TASKS.md](./TASKS.md) for development progress
4. 🔨 Start building and customizing!

## Get Help

- 📚 Check [SETUP.md](./SETUP.md) for detailed guide
- 🐛 Report issues on GitHub
- 💬 Read documentation in each folder

---

Happy Trading! 📈💎
