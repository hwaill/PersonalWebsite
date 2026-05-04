#!/usr/bin/env node
// Usage: node bin/hash-password.js <password>
// Prints the hash string to use in BOOKCLUB_USERS

const { scryptSync, randomBytes } = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node bin/hash-password.js <password>');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${hash}`);
