require("dotenv").config();
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

async function loginToPictory() {
    // **Buka browser**
    const browser = await chromium.launch({ headless: false }); // Gunakan headless: true untuk cloud execution
    const page = await browser.newPage();

    try {
        console.log("🚀 Navigating to Pictory.ai...");
        await page.goto(BASE_URL, { waitUntil: "networkidle" });

        // **Isi email dan password**
        console.log("🔐 Logging in...");
        await page.fill('input[type="email"]', EMAIL);
        await page.fill('input[type="password"]', PASSWORD);
        await page.click('button:has-text("Sign In")');

        // **Tunggu dashboard muncul**
        await page.waitForSelector("text=Create New Project", { timeout: 10000 });
        console.log("✅ Successfully logged in!");

        // **Simpan sesi login agar tidak login terus-menerus**
        await page.context().storageState({ path: "session.json" });
        console.log("💾 Session saved!");

    } catch (error) {
        console.error("❌ Login failed:", error);
    } finally {
        await browser.close();
    }
}

// **Jalankan fungsi login**
loginToPictory();
