require("dotenv").config();
const { chromium } = require("playwright");
const fs = require("fs-extra");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "https://pictory.ai";
const LOGIN_URL = "https://app.pictory.ai/login"; // Direct login page
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const DOWNLOAD_PATH = process.env.DOWNLOAD_PATH || "./downloads";
const MAX_RETRIES = 3;

async function runAutomation() {
    const browser = await chromium.launch({ headless: false, slowMo: 300 }); // Use headless: true for production
    const page = await browser.newPage();

    try {
        console.log("🚀 Navigating to Pictory.ai...");
        await page.goto(BASE_URL, { waitUntil: "networkidle" });

        // **Navigate to Login Page Directly**
        console.log("🔀 Redirecting to login page...");
        await page.goto(LOGIN_URL, { waitUntil: "networkidle" });

        // **Wait for login form**
        console.log("⏳ Waiting for login form...");
        await page.waitForSelector('input[type="email"], input[name="email"], input[placeholder*="Email"]', { timeout: 20000 });

        // **Login Handling**
        await retryAction(async () => {
            console.log("🔑 Filling in credentials...");
            await page.fill('input[type="email"], input[name="email"], input[placeholder*="Email"]', EMAIL);
            await page.fill('input[type="password"], input[name="password"], input[placeholder*="Password"]', PASSWORD);
            await page.click('button:has-text("Sign In")');
        }, "Logging in");

        // **Wait for dashboard**
        console.log("⏳ Waiting for dashboard...");
        await page.waitForSelector("text=Create New Project", { timeout: 15000 });
        console.log("✅ Successfully logged in!");

        // **Navigate to project creation**
        await retryAction(async () => {
            await page.click("text=Create New Project");
        }, "Navigating to project creation");

        // **Form Submission Example**
        await retryAction(async () => {
            await page.fill('textarea[placeholder="Enter your script"]', "This is a test automation script.");
            await page.click('button:has-text("Generate Video")');
        }, "Submitting form");

        // **Wait for download button**
        await page.waitForSelector('button:has-text("Download")', { timeout: 30000 });

        // **Download file**
        console.log("📥 Downloading file...");
        const [download] = await Promise.all([
            page.waitForEvent("download"),
            page.click('button:has-text("Download")')
        ]);

        const filePath = path.join(DOWNLOAD_PATH, download.suggestedFilename());
        await download.saveAs(filePath);
        console.log(`✅ File downloaded at: ${filePath}`);

    } catch (error) {
        console.error("❌ Automation failed:", error);
    } finally {
        await browser.close();
    }
}

// **Retry Mechanism** to handle UI changes
async function retryAction(action, description) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await action();
            console.log(`${description} - ✅ Success on attempt ${attempt}`);
            return;
        } catch (error) {
            console.warn(`${description} - ❌ Attempt ${attempt} failed`);
            if (attempt === MAX_RETRIES) throw error;
        }
    }
}

// **Run Automation**
runAutomation();
