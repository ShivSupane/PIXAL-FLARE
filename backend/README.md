# Photography Project Backend

A RESTful API backend for a photography website built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Google OAuth authentication
- JWT token-based authentication
- Photography service booking system
- Additional services with automatic price calculation
- Protected routes
- MongoDB database integration

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Google OAuth credentials (for Google authentication)

## Setup

1. Clone the repository:
```
git clone <repository-url>
cd major-photography-project-main
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/photography-project
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
```

4. Seed the database with sample data (optional):
```
npm run seed
```

5. Start the development server:
```
npm run dev
```

6. For production:
```
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/google` - Authenticate with Google
- `GET /api/auth/google/callback` - Google OAuth callback

### Photography Services

- `GET /api/services` - Get all photography services
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a new service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

### Additional Services

- `GET /api/additional-services` - Get all additional services
- `GET /api/additional-services/:id` - Get a specific additional service
- `POST /api/additional-services` - Create a new additional service (admin only)
- `PUT /api/additional-services/:id` - Update an additional service (admin only)
- `DELETE /api/additional-services/:id` - Delete an additional service (admin only)

### Bookings

- `POST /api/bookings/calculate` - Calculate price for a booking
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings for the logged-in user
- `GET /api/bookings/:id` - Get a specific booking
- `PUT /api/bookings/:id` - Update a booking
- `PUT /api/bookings/:id/cancel` - Cancel a booking
- `GET /api/bookings/admin/all` - Get all bookings (admin only)
- `PUT /api/bookings/:id/status` - Update booking status (admin only)

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── db.js         # Database connection
│   └── passport.js   # Passport configuration
├── controllers/      # Route controllers
│   ├── auth.js       # Auth controllers
│   ├── googleAuth.js # Google auth controller
│   ├── booking.js    # Booking controllers
│   ├── photographyService.js # Photography service controllers
│   └── additionalService.js  # Additional service controllers
├── middleware/       # Custom middleware
│   ├── auth.js       # Authentication middleware
│   └── error.js      # Error handling middleware
├── models/           # Mongoose models
│   ├── User.js       # User model
│   ├── Booking.js    # Booking model
│   ├── PhotographyService.js # Photography service model
│   └── AdditionalService.js # Additional service model
├── routes/           # Express routes
│   ├── auth.js       # Auth routes
│   ├── bookings.js   # Booking routes
│   ├── services.js   # Photography service routes
│   └── additionalServices.js # Additional service routes
├── utils/            # Utility files
│   └── seedData.js   # Database seeding script
└── server.js         # App entry point
```

## Database Seeding

To populate the database with sample photography services and additional services:

```
npm run seed
```

To remove the sample data:

```
npm run seed:delete
```

## License

MIT 