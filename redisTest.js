const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: null,  // Set your password if needed
});

redis.ping()
    .then(() => console.log("✅ Redis connected successfully!"))
    .catch(err => console.error("❌ Redis connection failed:", err));
