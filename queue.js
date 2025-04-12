const { Queue } = require('bullmq');
require('dotenv').config();

const queue = new Queue('pictory-video', {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        tls: {}, // Upstash Redis biasanya pakai TLS
    },
});

module.exports = queue;
