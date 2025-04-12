const { Worker } = require('bullmq');
require('dotenv').config();
const { runPictoryJob } = require('./playwright-job');

new Worker('pictory-video', async (job) => {
    const { videoTitle, videoScript } = job.data;

    console.log(`📦 Processing job ${job.id}...`);
    console.log(`🎬 Title: ${videoTitle}`);
    
    try {
        await runPictoryJob(videoTitle, videoScript);
        console.log(`✅ Finished job ${job.id}`);
    } catch (err) {
        console.error(`❌ Error during job: ${err.message}`);
        // Optional: save screenshot or log for debugging
        if (err.stack) console.error(err.stack);
    }
}, {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        tls: {}, // Only if using Redis over SSL (optional)
    },
});
