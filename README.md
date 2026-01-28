# Tour Booking Platform

A full-stack tour and activity booking platform built with Next.js, featuring an admin dashboard, client-facing website, and RESTful API server.

## 🏗️ Project Structure

```
tour-base/
├── admin/          # Admin dashboard (Next.js)
├── client/         # Client website (Next.js)
└── server/         # API server (Express + TypeScript)
```

## 🚀 Tech Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS, Shadcn/UI
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Mongoose)
- **State Management:** Zustand, React Query
- **Authentication:** JWT
- **Payment:** Cashfree
- **Cloud Storage:** Cloudinary

## 📋 Prerequisites

- Node.js >= 18
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tour-base
```

2. Install dependencies for all projects
```bash
cd admin && npm install
cd ../client && npm install
cd ../server && npm install
```

3. Configure environment variables
- Create `.env` files in each directory (admin, client, server)
- Refer to `.env.example` in each directory for required variables

## 🏃 Running the Application

### Development Mode

```bash
# Run admin dashboard (http://localhost:3000)
cd admin && npm run dev

# Run client website (http://localhost:3001)
cd client && npm run dev

# Run API server
cd server && npm run dev
```

### Production Build

```bash
# Build admin
cd admin && npm run build && npm start

# Build client
cd client && npm run build && npm start

# Build and run server
cd server && npm run build && npm start
```

## 📁 Key Features

- **Admin Dashboard:** Tour/activity management, booking management, user reviews, category management
- **Client Website:** Tour browsing, activity booking, payment integration, booking management
- **API Server:** RESTful endpoints, authentication, media upload, rate limiting

## 📝 License

Private - All rights reserved