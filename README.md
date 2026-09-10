# 📸 PixalFlare

**A Modern Photography Booking Platform Connecting Clients with Professional Photographers**

![TypeScript](https://img.shields.io/badge/TypeScript-89.5%25-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-10.2%25-yellow)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

PixalFlare is a **full-stack B2C (Business-to-Client) platform** that revolutionizes how clients discover, connect with, and book professional photographers. Whether you're looking for wedding photography, event coverage, portraits, or commercial shoots, PixalFlare makes it simple and seamless.

### Key Highlights
- 🔐 **Secure Authentication** - Email/password and Google OAuth support
- 💼 **Professional Portfolios** - Photographers showcase their work and services
- 📅 **Smart Booking System** - Real-time availability and pricing calculations
- 💳 **Flexible Pricing** - Base services + add-ons with automatic price computation
- 🔒 **Role-Based Access** - Separate user and admin dashboards
- ⚡ **Scalable Architecture** - Built for growth and performance

---

## 🛠 Tech Stack

### Frontend
- **React** (TypeScript/JavaScript)
- **HTML5 & CSS3**
- **Responsive Design**

### Backend
- **Node.js** (v16+)
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM/Schema validation
- **JWT** - Secure token-based authentication
- **Passport.js** - OAuth integration

### Deployment & DevOps
- **AWS** - Cloud hosting
- **Docker** - Containerization support
- **Environment Configuration** (.env)
- **REST API Architecture**

---

## ✨ Features

### User Management
- ✅ User registration and email verification
- ✅ Secure login with JWT tokens
- ✅ Google OAuth 2.0 authentication
- ✅ Profile management and preferences
- ✅ Role-based access control (Client/Photographer/Admin)

### Photography Services
- ✅ Browse services by category (events, weddings, portraits, commercial)
- ✅ Detailed service information with pricing
- ✅ Photographer portfolios and ratings
- ✅ Service filtering and search

### Booking System
- ✅ Create and manage bookings
- ✅ Real-time price calculation
- ✅ Add optional services (edited photos, prints, albums, etc.)
- ✅ Booking status tracking (pending, confirmed, completed, cancelled)
- ✅ Cancellation support with policies

### Additional Features
- ✅ Add-on services selection
- ✅ Direct client-photographer messaging
- ✅ Booking history and analytics
- ✅ Admin dashboard for service management
- ✅ Secure API endpoints with authentication

---

## 📁 Project Structure

```
PIXAL-FLARE/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── styles/             # CSS/styling
│   │   └── App.tsx             # Main app component
│   └── package.json
│
├── backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── config/             # Configuration & database setup
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── passport.js     # Passport.js configuration
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.js         # Authentication logic
│   │   │   ├── googleAuth.js   # Google OAuth handler
│   │   │   ├── booking.js      # Booking operations
│   │   │   ├── photographyService.js
│   │   │   └── additionalService.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.js         # JWT verification
│   │   │   └── error.js        # Error handling
│   │   ├── models/             # MongoDB schemas
│   │   │   ├── User.js         # User model
│   │   │   ├── Booking.js      # Booking model
│   │   │   ├── PhotographyService.js
│   │   │   └── AdditionalService.js
│   │   ├── routes/             # API routes
│   │   │   ├── auth.js
│   │   │   ├── bookings.js
│   │   │   ├── services.js
│   │   │   └── additionalServices.js
│   │   ├── utils/              # Utility functions
│   │   │   └── seedData.js     # Sample data for testing
│   │   └── server.js           # App entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud instance)
- **Google OAuth credentials** (for OAuth integration)

### Backend Setup

#### 1️⃣ Clone & Navigate
```bash
git clone https://github.com/ShivSupane/PIXAL-FLARE.git
cd PIXAL-FLARE/backend
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the backend root directory:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pixal-flare
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixal-flare

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend
FRONTEND_URL=http://localhost:3000
```

#### 4️⃣ Seed Sample Data (Optional)
```bash
npm run seed
```
To delete sample data:
```bash
npm run seed:delete
```

#### 5️⃣ Start Development Server
```bash
npm run dev
```
Server runs on `http://localhost:5000`

#### 6️⃣ Production Build
```bash
npm start
```

---

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/logout` | User logout | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |
| GET | `/api/auth/google` | Google OAuth login | ❌ |
| GET | `/api/auth/google/callback` | OAuth callback | ❌ |

### Photography Services
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | Get all services | ❌ |
| GET | `/api/services/category/:category` | Filter by category | ❌ |
| GET | `/api/services/:id` | Get service details | ❌ |
| POST | `/api/services` | Create service | ✅ Admin |
| PUT | `/api/services/:id` | Update service | ✅ Admin |
| DELETE | `/api/services/:id` | Delete service | ✅ Admin |

### Additional Services (Add-ons)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/additional-services` | Get all add-ons | ❌ |
| GET | `/api/additional-services/:id` | Get add-on details | ❌ |
| POST | `/api/additional-services` | Create add-on | ✅ Admin |
| PUT | `/api/additional-services/:id` | Update add-on | ✅ Admin |
| DELETE | `/api/additional-services/:id` | Delete add-on | ✅ Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings/calculate` | Calculate total price | ✅ |
| POST | `/api/bookings` | Create new booking | ✅ |
| GET | `/api/bookings` | Get user's bookings | ✅ |
| GET | `/api/bookings/:id` | Get booking details | ✅ |
| PUT | `/api/bookings/:id` | Update booking | ✅ |
| PUT | `/api/bookings/:id/cancel` | Cancel booking | ✅ |
| GET | `/api/bookings/admin/all` | All bookings | ✅ Admin |
| PUT | `/api/bookings/:id/status` | Update status | ✅ Admin |

---

## 🔑 Environment Variables Guide

```env
PORT                    # Express server port (default: 5000)
NODE_ENV               # Environment mode: development/production
MONGODB_URI            # MongoDB connection string
JWT_SECRET             # Secret key for JWT signing
JWT_EXPIRE             # Token expiration time (e.g., 30d)
GOOGLE_CLIENT_ID       # Google OAuth Client ID
GOOGLE_CLIENT_SECRET   # Google OAuth Client Secret
GOOGLE_CALLBACK_URL    # OAuth redirect URL
FRONTEND_URL           # Frontend application URL
```

---

## 🗄 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'client' | 'photographer' | 'admin',
  phone: String,
  profilePicture: String,
  bio: String,
  portfolio: [String], // URLs to portfolio images
  ratings: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  client: ObjectId (ref: User),
  photographer: ObjectId (ref: User),
  service: ObjectId (ref: PhotographyService),
  additionalServices: [ObjectId],
  bookingDate: Date,
  duration: Number, // in hours
  totalPrice: Number,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Photography Service Model
```javascript
{
  name: String,
  category: String, // e.g., 'wedding', 'event', 'portrait'
  description: String,
  basePrice: Number,
  duration: Number, // in hours
  photographer: ObjectId (ref: User),
  images: [String],
  availability: [Date],
  ratings: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing & Development

### Run Development Server with Auto-Reload
```bash
npm run dev
```

### Run in Production Mode
```bash
npm start
```

### View Seeded Data
After running `npm run seed`, sample photography services and add-ons will be available in MongoDB.

---

## 📋 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Remove sample data
npm run seed:delete

# View logs
npm logs
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Stateless, token-based auth
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Google OAuth 2.0** - Third-party authentication
- ✅ **Protected Routes** - Middleware-based authorization
- ✅ **CORS Configuration** - Cross-origin request handling
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Input Validation** - Request data verification

---

## 🚀 Deployment

### AWS Deployment
1. Set up an EC2 instance or use Elastic Beanstalk
2. Configure environment variables on the server
3. Set up MongoDB Atlas for cloud database
4. Deploy using Git or Docker containers
5. Configure SSL/HTTPS with AWS Certificate Manager

### Docker Deployment
```bash
docker build -t pixal-flare-backend .
docker run -p 5000:5000 --env-file .env pixal-flare-backend
```

---

## 📝 API Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "role": "client"
  }'
```

### Get All Services
```bash
curl http://localhost:5000/api/services
```

### Create a Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "photographer": "photographer_id",
    "service": "service_id",
    "bookingDate": "2024-12-25",
    "additionalServices": ["addon_id_1"]
  }'
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running locally or MongoDB Atlas is accessible
- Check `MONGODB_URI` in `.env`
- Ensure network access is configured for MongoDB Atlas

### JWT Errors
- Verify `JWT_SECRET` is set in `.env`
- Check token format: `Authorization: Bearer <token>`

### Google OAuth Issues
- Verify credentials in Google Cloud Console
- Check redirect URI matches `GOOGLE_CALLBACK_URL`
- Clear browser cookies if authentication fails

### Port Already in Use
```bash
# Change PORT in .env or:
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👤 Author

**Shiv Supane**  
📧 Email: [contact info]  
🔗 GitHub: [@ShivSupane](https://github.com/ShivSupane)

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- Passport.js authentication strategies
- Google OAuth documentation

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/ShivSupane/PIXAL-FLARE/issues)
- Check existing documentation
- Review API endpoint examples

---

**Made with ❤️ by Shiv Supane**

⭐ If this project helps you, please consider giving it a star!
