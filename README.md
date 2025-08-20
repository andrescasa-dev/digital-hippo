# 🦛 DigitalHippo

A complete **digital marketplace** built with **Next.js 14**, featuring secure authentication, payment processing, content management, and a modern responsive user experience for buying and selling high-quality digital assets.

## ✨ Key Features

### 🔐 **Authentication & User Management**
- **Email/Password Authentication**: Secure user registration and login system
- **Email Verification**: User email verification with secure tokens
- **Role-Based Access**: Separate user and admin roles with granular permissions
- **Session Management**: Secure session handling with JWT tokens
- **Protected Routes**: Middleware-based route protection

### 🛍️ **E-commerce & Payments**
- **Stripe Integration**: Complete payment processing with Stripe Checkout
- **Shopping Cart**: Persistent cart with Zustand state management
- **Order Management**: Full order lifecycle from creation to fulfillment
- **Digital Asset Delivery**: Instant delivery via email after payment
- **Receipt System**: Automated email receipts with order details
- **Webhook Processing**: Secure Stripe webhook handling for payment verification

### 📦 **Product & Content Management**
- **PayloadCMS Integration**: Powerful headless CMS for content management
- **Digital Asset Categories**: Organized UI Kits and Icons collections
- **File Management**: Secure digital file storage and delivery
- **Product Approval**: Admin approval workflow for seller products
- **Image Management**: Multi-image product galleries with optimization
- **Seller Dashboard**: Dedicated admin panel for product management

### 🎨 **User Experience & Interface**
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI Components**: Custom components built with Radix UI
- **Shopping Cart Sidebar**: Slide-out cart with real-time updates
- **Product Search & Filtering**: Advanced product discovery features
- **Loading States**: Smooth loading experiences with skeletons
- **Toast Notifications**: User feedback with Sonner toast notifications

## 🏗️ Architecture Overview

### **Frontend (Next.js 14)**
```
├── App Router Architecture
│   ├── SSG (Static Site Generation) for product pages
│   ├── SSR (Server Side Rendering) for dynamic content
│   └── API Routes for backend integration
│
├── Component Architecture
│   ├── UI Components (Radix UI + Tailwind)
│   ├── Business Logic Components (Cart, Products, Auth)
│   ├── Layout Components (Header, Footer, Navigation)
│   └── Form Components (React Hook Form + Zod)
│
└── State Management
    ├── Zustand for cart state
    ├── tRPC for server state
    └── React Query for caching
```

### **Backend Architecture**
```
├── Content Management (PayloadCMS)
│   ├── Collections (Users, Products, Orders, Media)
│   ├── Admin Panel (/sell route)
│   └── MongoDB Database
│
├── API Layer (tRPC)
│   ├── Authentication Router
│   ├── Payment Router
│   └── Type-safe procedures
│
├── Payment Processing
│   ├── Stripe Checkout Sessions
│   ├── Webhook Verification
│   └── Order Fulfillment
│
└── Email System
    ├── Resend Integration
    ├── Receipt Generation
    └── Verification Emails
```

## 🛠️ Technologies Used

### **Core Framework**
- **Next.js 14**: React framework with App Router
- **React 18**: User interface library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### **Backend & Database**
- **PayloadCMS**: Headless content management system
- **MongoDB**: Document database via Mongoose
- **tRPC**: End-to-end typesafe APIs
- **Express.js**: Node.js web framework

### **Authentication & Security**
- **JWT**: JSON Web Tokens for authentication
- **Payload Auth**: Built-in authentication system
- **Middleware**: Route protection and request validation
- **Zod**: Schema validation library

### **Payments & E-commerce**
- **Stripe**: Payment processing and checkout
- **Webhooks**: Secure payment verification
- **Order Management**: Complete e-commerce workflow

### **State Management & Data Fetching**
- **Zustand**: Lightweight state management
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management
- **Persistent Storage**: localStorage integration

### **UI & Styling**
- **Radix UI**: Unstyled, accessible UI components
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Class Variance Authority**: Component variants
- **Sonner**: Toast notifications

### **Email & Communications**
- **Resend**: Email delivery service
- **React Email**: Email template components
- **Nodemailer**: Email sending library

### **Development Tools**
- **ESLint**: Code linting
- **Nodemon**: Development server
- **Cross-env**: Environment variables
- **Copyfiles**: Asset management

## 📄 License

This project is available under the MIT License.

<br />

**Built with ❤️ using Next.js 14, PayloadCMS, and modern web development best practices.**