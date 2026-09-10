const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectDB = require('./config/db');
const setupPassport = require('./config/passport');
const errorHandler = require('./middleware/error');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Setup passport
setupPassport();

// Initialize app
const app = express();

// Security, logging & perf
app.use(helmet());
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Body parser
app.use(express.json({ limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Rate limiting for APIs
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Initialize Passport
app.use(passport.initialize());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/additional-services', require('./routes/additionalServices'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/photographers', require('./routes/photographers'));

// Basic API test route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Serve static frontend assets in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
    }
  });
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err && err.message ? err.message : err}`);
  server.close(() => process.exit(1));
});
