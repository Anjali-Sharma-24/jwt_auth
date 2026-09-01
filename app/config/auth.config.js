module.exports = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRES_IN || "24h"
};