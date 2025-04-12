const { Worker, QueueEvents } = require('bullmq');
require('dotenv').config();

const redisConfig = {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
    }
};

// Event listener for queue
const videoQueueEvents = new QueueEvents('videoQueue', redisConfig);

// Worker to process jobs
const worker = new Worker('videoQueue', async job => {
    console.log(`✅ Processing job ID: ${job.id}`);
    console.log(`🎥 Video Title: ${job.data.videoTitle}`);
    console.log(`📜 Video Script: ${job.data.videoScript}`);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(`✅ Job ${job.id} completed!`);
    return { message: "Test Job Completed!" };
}, redisConfig);

worker.on('completed', job => {
    console.log(`🎉 Job ID ${job.id} completed successfully!`);
});

worker.on('failed', (job, err) => {
    console.error(`❌ Job ID ${job.id} failed:`, err);
});
