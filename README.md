# Tour Booking Platform

A full-stack tour and activity booking platform built with Next.js, featuring an admin dashboard, client-facing website, and RESTful API server. This system provides comprehensive tour management, online booking capabilities, and integrated payment processing.

## Overview

This monorepo contains three interconnected applications that form a complete tour booking solution:

- **Admin Dashboard** - Management interface for tours, activities, bookings, and customer reviews
- **Client Website** - Public-facing platform for browsing and booking tours and activities
- **API Server** - Backend service providing RESTful endpoints and business logic

## Project Structure

```
tour-base/
├── admin/          # Admin dashboard (Next.js 16)
│   ├── app/        # App router pages and layouts
│   ├── src/        # Components, modules, and utilities
│   └── public/     # Static assets
├── client/         # Client website (Next.js 16)
│   ├── app/        # App router pages and layouts
│   ├── src/        # Components, modules, and utilities
│   └── public/     # Static assets
└── server/         # API server (Express + TypeScript)
    ├── src/        # Application source code
    └── logs/       # Application logs
```

## Technology Stack

### Frontend Applications
- **Framework:** Next.js 16 with React 19
- **Styling:** TailwindCSS 4
- **UI Components:** Radix UI primitives with Shadcn/UI
- **Forms:** React Hook Form with Zod validation
- **State Management:** Zustand for global state, TanStack Query for server state
- **Rich Text:** TipTap editor (admin), DOMPurify for sanitization

### Backend Server
- **Runtime:** Node.js with TypeScript
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT-based authentication with bcrypt
- **Security:** Helmet, HPP, CORS, rate limiting
- **Logging:** Winston with Morgan
- **Validation:** Zod schemas

### Third-Party Integrations
- **Payment Gateway:** Cashfree Payments
- **Cloud Storage:** Cloudinary for media management
- **HTTP Client:** Axios

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn package manager
- MongoDB (local installation or cloud instance)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tour-base
```

### 2. Install Dependencies

Install dependencies for each application:

```bash
# Admin dashboard
cd admin
npm install

# Client website
cd ../client
npm install

# API server
cd ../server
npm install
```

### 3. Environment Configuration

Create `.env` files in each directory (admin, client, server) with the required environment variables. Refer to `.env.example` files in each directory for the complete list of required variables.

#### Server Environment Variables (Example)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tour-booking
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Client/Admin Environment Variables (Example)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## Running the Application

### Development Mode

Start each application in development mode with hot reloading:

```bash
# Terminal 1 - API Server
cd server
npm run dev

# Terminal 2 - Admin Dashboard (http://localhost:3000)
cd admin
npm run dev

# Terminal 3 - Client Website (http://localhost:3001)
cd client
npm run dev
```

### Production Build

Build and run the applications in production mode:

```bash
# Build admin dashboard
cd admin
npm run build
npm start

# Build client website
cd client
npm run build
npm start

# Build and run API server
cd server
npm run build
npm start
```

## Key Features

### Admin Dashboard
- Tour and activity management with rich text descriptions
- Booking management and status tracking
- Category and package management
- Customer review moderation
- Media upload and management via Cloudinary
- Request handling system

### Client Website
- Responsive tour and activity browsing
- Advanced filtering and search capabilities
- Secure booking process with OTP verification
- Integrated payment processing via Cashfree
- Booking management and status tracking
- Contact and support forms
- SEO-optimized pages with sitemap generation

### API Server
- RESTful API architecture
- JWT-based authentication and authorization
- Role-based access control
- Request validation with Zod schemas
- Rate limiting and security middleware
- Structured logging system
- Error handling and validation

## API Documentation

The API server exposes endpoints for:

- Authentication (`/api/auth`)
- Tours management (`/api/tours`)
- Activities management (`/api/activities`)
- Bookings (`/api/bookings`)
- Reviews (`/api/reviews`)
- Categories (`/api/categories`)
- Media uploads (`/api/media`)
- Customer requests (`/api/requests`)

Detailed API documentation can be found in the server directory.

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint configurations provided in each project
- Maintain consistent naming conventions

### Component Structure
- Keep components modular and reusable
- Use TypeScript interfaces for props
- Implement proper error boundaries

### State Management
- Use TanStack Query for server state
- Use Zustand for client-side global state
- Keep state as local as possible

## License

This project is private and proprietary. All rights reserved.