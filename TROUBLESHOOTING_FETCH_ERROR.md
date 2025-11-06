# 🐛 Troubleshooting "Failed to Fetch" Error

## Problem
When trying to register, you're getting a "Failed to fetch" error.

## Common Causes & Solutions

### 1. MongoDB Not Connected ⚠️ (Most Likely)

The backend requires MongoDB to be running. You have two options:

#### **Option A: Use MongoDB Atlas (Recommended - Easiest)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free (no credit card needed)
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tradesim?retryWrites=true&w=majority
```

Replace `username` and `password` with your actual credentials.

#### **Option B: Install Local MongoDB**

**For Windows:**
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB should start automatically as a service
4. Keep the default connection in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/tradesim
```

**Verify MongoDB is running:**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Or try to connect
mongosh
```

---

### 2. Backend Server Issue

The backend might have crashed or not started properly.

**Check Backend Terminal:**
Look for these messages:
- ✅ `✅ MongoDB Connected Successfully` - Good!
- ❌ `❌ MongoDB Connection Error` - MongoDB not running
- ✅ `🚀 Server is running on port 5000` - Good!

**If backend crashed, restart it:**
```powershell
# Stop current servers (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

### 3. Quick Fix - Use a Free MongoDB Atlas Instance

The fastest solution is to use MongoDB Atlas (cloud MongoDB - always available):

**Step-by-step:**

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:**
   - Choose "Shared" (Free)
   - Select AWS provider
   - Choose closest region
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `tradesim_user`
   - Password: `tradesim2025` (or generate one)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Go back to "Database" (left menu)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://tradesim_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://tradesim_user:tradesim2025@cluster0.xxxxx.mongodb.net/tradesim?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password and update the cluster URL.

7. **Restart Backend:**
   - Stop the current server (Ctrl+C)
   - Run: `npm run dev`
   - Look for: `✅ MongoDB Connected Successfully`

---

### 4. CORS Issue (Less Likely)

If MongoDB is connected but still failing, check CORS:

**Update backend/.env:**
```env
ALLOWED_ORIGINS=http://localhost:5173
```

**Restart backend server after changes**

---

### 5. Port Conflict

Make sure backend is actually running on port 5000:

**Test backend directly:**
Open in browser: http://localhost:5000/api/health

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T..."
}
```

If you see an error or page doesn't load, backend isn't running.

---

## 🔧 Step-by-Step Fix (Recommended)

### **Quick Solution - Use MongoDB Atlas:**

1. **Create MongoDB Atlas account** (5 minutes)
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create free cluster** (wait 3-5 minutes)

3. **Create database user:**
   - Database Access → Add New Database User
   - Username: `admin`
   - Password: `admin123` (or anything you prefer)

4. **Allow network access:**
   - Network Access → Add IP Address
   - "Allow Access from Anywhere" → Confirm

5. **Get connection string:**
   - Database → Connect → Connect your application
   - Copy the string (looks like `mongodb+srv://...`)

6. **Update `.env` file:**
   ```powershell
   # Open backend/.env in editor
   code backend\.env
   ```

   Replace the MONGODB_URI line:
   ```env
   MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/tradesim?retryWrites=true&w=majority
   ```

7. **Restart backend:**
   - Stop server (Ctrl+C in terminal running `npm run dev`)
   - Start again: `npm run dev`

8. **Verify connection:**
   - Look for: `✅ MongoDB Connected Successfully`
   - Test registration again!

---

## ✅ Verification Steps

After fixing, verify everything works:

1. **Check backend health:**
   ```
   http://localhost:5000/api/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Check backend terminal:**
   ```
   ✅ MongoDB Connected Successfully
   🚀 Server is running on port 5000
   ```

3. **Try registration again:**
   - Go to http://localhost:5173/register
   - Fill in the form
   - Click "Register"
   - Should redirect to dashboard!

---

## 🆘 Still Having Issues?

If still not working:

1. **Check browser console** (F12 → Console tab)
   - Look for error messages
   - Share the exact error message

2. **Check backend terminal**
   - Look for any error messages
   - Share what you see

3. **Test with curl:**
   ```powershell
   curl http://localhost:5000/api/health
   ```

4. **Restart everything:**
   ```powershell
   # Kill all terminals
   # Then start fresh:
   npm run dev
   ```

---

## 📝 Summary

**Most likely issue:** MongoDB is not connected

**Fastest fix:** 
1. Create free MongoDB Atlas account
2. Update MONGODB_URI in backend/.env
3. Restart backend server
4. Try registration again

**Expected result:** Registration works, user created with $100,000 balance! 🎉

---

Let me know which error message you see in the backend terminal, and I can help further!
