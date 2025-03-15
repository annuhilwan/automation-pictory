const express = require("express");
const { runAutomation } = require("./automation");

const app = express();
const PORT = 3000;

app.get("/start-automation", async (req, res) => {
    console.log("🚀 Starting automation...");
    const result = await runAutomation();

    if (result.success) {
        res.status(200).json({ success: true, message: "Automation completed" });
    } else {
        res.status(500).json({ success: false, error: result.error || "Unknown error" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
