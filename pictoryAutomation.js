require("dotenv").config();
const { chromium } = require("playwright");
const fs = require("fs-extra");
const path = require("path");

const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const DOWNLOAD_PATH = process.env.DOWNLOAD_PATH;
const MAX_RETRIES = 3;

async function runAutomation() {
    const browser = await chromium.launch({ headless: false }); // Gunakan headless: true untuk cloud execution
    const page = await browser.newPage();

    try {
        console.log("Navigating to Pictory.ai...");
        await page.goto(BASE_URL, { waitUntil: "networkidle" });

        // **Login Handling**
        await retryAction(async () => {
            await page.fill('input[type="email"]', EMAIL);
            await page.fill('input[type="password"]', PASSWORD);
            await page.click('button:has-text("Sign In")');
        }, "Logging in");

        // **Wait for dashboard**
        await page.waitForSelector("text=Create New Project", { timeout: 10000 });

        console.log("Successfully logged in!");

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
        console.log("Downloading file...");
        const [download] = await Promise.all([
            page.waitForEvent("download"),
            page.click('button:has-text("Download")')
        ]);

        const filePath = path.join(DOWNLOAD_PATH, download.suggestedFilename());
        await download.saveAs(filePath);
        console.log(`File downloaded at: ${filePath}`);

    } catch (error) {
        console.error("Automation failed:", error);
    } finally {
        await browser.close();
    }
}

// **Retry Mechanism** untuk menangani UI yang berubah
async function retryAction(action, description) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await action();
            console.log(`${description} - Success on attempt ${attempt}`);
            return;
        } catch (error) {
            console.warn(`${description} - Attempt ${attempt} failed`);
            if (attempt === MAX_RETRIES) throw error;
        }
    }
}

// Jalankan otomatisasi
runAutomation();
