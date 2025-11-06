# ✅ TradeSim - Setup Checklist

Use this checklist to complete your initial setup. Check off each item as you complete it.

---

## 📋 Pre-Installation Checklist

- [ ] **Node.js Installed** (v18 or higher)
  - Check: Open PowerShell and run `node --version`
  - Download: https://nodejs.org/

- [ ] **npm Installed** (comes with Node.js)
  - Check: Run `npm --version`

- [ ] **Git Installed**
  - Check: Run `git --version`
  - Download: https://git-scm.com/

- [ ] **MongoDB Decision Made**
  - [ ] Option A: MongoDB Atlas (Cloud) - Recommended
  - [ ] Option B: Local MongoDB Installation

---

## 🔧 Installation Steps

- [ ] **Step 1: Install Dependencies**
  ```powershell
  .\install.ps1
  ```
  Or manually:
  ```powershell
  npm install
  cd backend ; npm install ; cd ..
  cd frontend ; npm install ; cd ..
  ```

- [ ] **Step 2: Configure Backend Environment**
  - [ ] Navigate to `backend/.env`
  - [ ] Update `MONGODB_URI` with your connection string
  - [ ] Update `JWT_SECRET` with a secure random string (min 32 chars)
  - [ ] Review and update other settings as needed

- [ ] **Step 3: Set Up MongoDB**
  
  **If using MongoDB Atlas:**
  - [ ] Sign up at https://www.mongodb.com/cloud/atlas
  - [ ] Create a free cluster
  - [ ] Create database user
  - [ ] Whitelist your IP (or use 0.0.0.0/0 for development)
  - [ ] Copy connection string
  - [ ] Paste in `backend/.env` as `MONGODB_URI`
  
  **If using Local MongoDB:**
  - [ ] Install MongoDB Community Edition
  - [ ] Start MongoDB service
  - [ ] Verify it's running (default: mongodb://localhost:27017)
  - [ ] Update `backend/.env` with local connection string

- [ ] **Step 4: Get API Keys (Optional but Recommended)**
  
  **Alpha Vantage (Stock Data):**
  - [ ] Visit https://www.alphavantage.co/support/#api-key
  - [ ] Get free API key
  - [ ] Add to `backend/.env` as `ALPHA_VANTAGE_API_KEY`
  
  **Finnhub (Market Data):**
  - [ ] Visit https://finnhub.io/register
  - [ ] Sign up and get API key
  - [ ] Add to `backend/.env` as `FINNHUB_API_KEY`

---

## 🚀 First Run

- [ ] **Start Development Servers**
  ```powershell
  npm run dev
  ```

- [ ] **Verify Backend is Running**
  - [ ] Open http://localhost:5000/api/health
  - [ ] Should see: `{"status":"ok","timestamp":"..."}`

- [ ] **Verify Frontend is Running**
  - [ ] Open http://localhost:5173
  - [ ] Should see the TradeSim homepage

- [ ] **Check Console for Errors**
  - [ ] Backend console: No red errors
  - [ ] Frontend console: No critical errors
  - [ ] MongoDB connection: "✅ MongoDB Connected Successfully"

---

## 📖 Documentation Review

- [ ] **Read Key Documents**
  - [ ] ✅ [GETTING_STARTED.md](./GETTING_STARTED.md) - Overall guide
  - [ ] ✅ [QUICKSTART.md](./QUICKSTART.md) - Quick reference
  - [ ] ✅ [TASKS.md](./TASKS.md) - Development roadmap
  - [ ] 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - System design

---

## 🛠️ Development Environment Setup

- [ ] **VS Code Extensions (Recommended)**
  - [ ] ESLint
  - [ ] Prettier
  - [ ] MongoDB for VS Code
  - [ ] TypeScript
  - [ ] ES7+ React/Redux/React-Native snippets

- [ ] **Configure VS Code**
  - [ ] Open project in VS Code
  - [ ] Check `.vscode/settings.json` is applied
  - [ ] Install recommended extensions when prompted

- [ ] **Test Hot Reload**
  - [ ] Edit `frontend/src/App.tsx`
  - [ ] Save and verify frontend auto-refreshes
  - [ ] Edit `backend/src/server.ts`
  - [ ] Save and verify backend auto-restarts

---

## 🎯 Ready to Develop

- [ ] **Understand Project Structure**
  - [ ] Review `ARCHITECTURE.md`
  - [ ] Understand frontend structure
  - [ ] Understand backend structure
  - [ ] Review database schema

- [ ] **Plan First Feature**
  - [ ] Read Phase 2 in `TASKS.md` (Authentication)
  - [ ] Understand what needs to be built
  - [ ] Identify starting point

- [ ] **Set Up Version Control**
  - [ ] Commit initial setup
  - [ ] Create development branch
  - [ ] Push to remote repository

---

## ✨ Optional Enhancements

- [ ] **Additional Tools**
  - [ ] Install MongoDB Compass (GUI for MongoDB)
  - [ ] Install Postman (API testing)
  - [ ] Install React Developer Tools (browser extension)

- [ ] **Learning Resources**
  - [ ] Bookmark React docs: https://react.dev/
  - [ ] Bookmark MUI docs: https://mui.com/
  - [ ] Bookmark Express docs: https://expressjs.com/
  - [ ] Bookmark MongoDB docs: https://docs.mongodb.com/

---

## 🐛 Troubleshooting Checklist

If you encounter issues, check these:

- [ ] **PowerShell Script Error**
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

- [ ] **Port Already in Use**
  - [ ] Change backend port in `backend/.env`
  - [ ] Change frontend port in `frontend/vite.config.ts`

- [ ] **MongoDB Connection Failed**
  - [ ] Verify MongoDB is running
  - [ ] Check connection string format
  - [ ] For Atlas: Verify IP whitelist
  - [ ] Check network/firewall settings

- [ ] **Module Not Found Errors**
  ```powershell
  # In root directory
  rm -r node_modules ; npm install
  
  # In backend
  cd backend ; rm -r node_modules ; npm install ; cd ..
  
  # In frontend
  cd frontend ; rm -r node_modules ; npm install ; cd ..
  ```

- [ ] **TypeScript Errors**
  - [ ] Make sure all dependencies are installed
  - [ ] Restart VS Code
  - [ ] Run `npm install` in respective directories

---

## 🎉 Completion

Once all items above are checked:

- [ ] **Take a Screenshot** of working application
- [ ] **Commit Your Setup** to git
- [ ] **Start Development** following TASKS.md Phase 2

---

## 📊 Current Status

```
Setup Phase:     [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%
Ready to Code:   [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%
Phase 1 Done:    [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%
Overall Project: [▓▓░░░░░░░░░░░░░░░░░░]  12%
```

---

## 🚀 Next Steps After Checklist

1. **Start Phase 2: Authentication**
   - Build User model (MongoDB schema)
   - Create registration endpoint
   - Create login endpoint
   - Build registration form (React)
   - Build login form (React)

2. **Reference Documentation**
   - Keep TASKS.md open for roadmap
   - Refer to ARCHITECTURE.md for design
   - Use SETUP.md for troubleshooting

3. **Development Workflow**
   - Create feature branch
   - Build feature
   - Test locally
   - Commit and push
   - Repeat

---

**Date Started:** _____________

**Setup Completed:** _____________

**Ready to Develop:** ✅

---

Good luck with your TradeSim development! 🚀📈
