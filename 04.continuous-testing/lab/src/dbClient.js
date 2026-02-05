const redis = require('redis');
const configure = require('./configure');
require('dotenv').config();

const config = configure();

const db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  // Le mot de passe est chargé depuis le fichier .env
  password: process.env.REDIS_PASSWORD,
  retry_strategy: () => {
    return new Error('Retry time exhausted');
  }
});

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db;