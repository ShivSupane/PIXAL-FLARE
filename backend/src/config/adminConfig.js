// Admin configuration with emails and secure passwords
const ADMIN_CONFIG = [
  {
    email: process.env.ADMIN_EMAIL_1 || '20220801046@dypiu.ac.in',
    password: process.env.ADMIN_PASSWORD_1 || 'Pravin!@1046'
  },
  {
    email: process.env.ADMIN_EMAIL_2 || '20220801082@dypiu.ac.in',
    password: process.env.ADMIN_PASSWORD_2 || 'Nikhil!@1082'
  },
  {
    email: process.env.ADMIN_EMAIL_3 || '20220801110@dypiu.ac.in',
    password: process.env.ADMIN_PASSWORD_3 || 'Shiv!@1110'
  }
];

// Extract just the email addresses for quick lookups
const ADMIN_EMAILS = ADMIN_CONFIG.map(admin => admin.email.toLowerCase());

// Function to validate admin credentials
const validateAdminCredentials = (email, password) => {
  const admin = ADMIN_CONFIG.find(admin => admin.email.toLowerCase() === email.toLowerCase());
  return admin && admin.password === password;
};

module.exports = {
  ADMIN_EMAILS,
  ADMIN_CONFIG,
  validateAdminCredentials
}; 