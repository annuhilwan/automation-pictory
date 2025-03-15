require("dotenv").config();
const { chromium } = require("playwright");
const fs = require("fs-extra");

const BASE_URL = "https://pictory.ai";
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const DEBUG_SCREENSHOT = "debug-login.png";

async function loginToPictory() {
    const browser = await chromium.launch({ headless: false }); 
    const page = await browser.newPage();

    try {
        console.log("🚀 Navigating to Pictory.ai...");
        await page.goto(BASE_URL, { waitUntil: "networkidle" });

        // **Debug: Screenshot awal**
        await page.screenshot({ path: "debug-home.png", fullPage: true });

        console.log("✅ Page loaded. Checking login form...");

        // **Cari tombol Login di homepage**
        const loginPageLink = await page.locator('a:has-text("Login"), button:has-text("Login")');
        if (await loginPageLink.isVisible()) {
            console.log("🔍 Clicking login button...");
            await Promise.all([
                loginPageLink.click(),
                page.waitForTimeout(5000), // Tunggu beberapa detik
                page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }).catch(() => {})
            ]);
        } else {
            console.log("❌ Login button not found on homepage!");
            await page.screenshot({ path: "debug-no-login-button.png", fullPage: true });
            return;
        }

        // **Pastikan halaman login sudah terbuka**
        await page.waitForTimeout(5000);
        await page.screenshot({ path: "debug-login-page.png", fullPage: true });

        // **Cek apakah input tersedia**
        const emailSelector = 'input[type="email"], input[name="email"], input[placeholder*="mail"]';
        const passwordSelector = 'input[type="password"], input[name="password"], input[placeholder*="Password"]';
        const loginButtonSelector = 'button:has-text("Sign In"), button:has-text("Login")';

        if (await page.locator(emailSelector).isVisible()) {
            console.log("✅ Login form detected!");
            await page.fill(emailSelector, EMAIL);
            await page.fill(passwordSelector, PASSWORD);
            await page.click(loginButtonSelector);
            console.log("🔑 Login submitted...");
        } else {
            console.log("❌ Login form not found! Taking screenshot...");
            await page.screenshot({ path: DEBUG_SCREENSHOT, fullPage: true });
            return;
        }

        // **Tunggu hingga masuk ke dashboard**
        try {
            await page.waitForSelector("text=Create New Project", { timeout: 15000 });
            console.log("🎉 Successfully logged in!");
        } catch (error) {
            console.log("❌ Login failed! CAPTCHA or incorrect credentials?");
            await page.screenshot({ path: "debug-failed-login.png", fullPage: true });
        }
    } catch (error) {
        console.error("❌ Error during login:", error);
    } finally {
        await browser.close();
    }
}

// **Jalankan script**
loginToPictory();
