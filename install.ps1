# TradeSim Installation Script for Windows
# Run this script to install all dependencies

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TradeSim - Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 1: Installing root dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Step 2: Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path "backend"
npm install

Write-Host ""
Write-Host "Step 3: Setting up backend environment..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
    Write-Host "  Please edit backend/.env with your configuration" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Set-Location -Path ".."

Write-Host ""
Write-Host "Step 4: Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "frontend"
npm install

Set-Location -Path ".."

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installation Complete! ✓" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env with your MongoDB URI and other settings" -ForegroundColor White
Write-Host "2. Make sure MongoDB is running" -ForegroundColor White
Write-Host "3. Run 'npm run dev' to start both servers" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see SETUP.md" -ForegroundColor Cyan
Write-Host ""
