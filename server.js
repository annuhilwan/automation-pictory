const express = require('express');
const queue = require('./queue');
require('dotenv').config();

// Bull Board
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const app = express();
app.use(express.json());

// 📊 Bull Board Setup
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.post('/add-job', async (req, res) => {
    const { videoTitle, videoScript } = req.body;
    if (!videoTitle || !videoScript) {
        return res.status(400).json({ error: "Missing title or script" });
    }

    try {
        const job = await queue.add('generate-video', { videoTitle, videoScript });
        console.log("✅ Job added:", job.id);
        res.json({ message: 'Job added to queue', jobId: job.id });
    } catch (err) {
        console.error("❌ Failed to add job:", err);
        res.status(500).json({ error: 'Failed to add job' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API listening at http://localhost:${PORT}`);
    console.log(`📊 Bull Board available at http://localhost:${PORT}/admin/queues`);
});
