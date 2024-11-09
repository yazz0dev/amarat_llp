// config.js
const crypto = require('crypto'); // Import the crypto module
const secretKey = crypto.randomBytes(32).toString('hex');
module.exports = { secretKey };