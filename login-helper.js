const { expect } = require('@playwright/test');

async function loginToPictory(page) {
    console.log("🚀 Navigating to login page...");
    await page.goto('https://app.pictory.ai/login', { waitUntil: 'networkidle' });

    console.log("⏳ Checking for iframes...");
    let loginFrame = null;
    const frames = page.frames();

    for (const frame of frames) {
        const frameUrl = frame.url();
        console.log(`🔍 Checking Frame URL: ${frameUrl}`);

        if (frameUrl.includes('auth') || frameUrl.includes('login')) {
            loginFrame = frame;
            console.log('🔐 Found login frame');
            await loginFrame.waitForLoadState('domcontentloaded');

            // Selectors for email & password fields
            const emailSelector = 'input[name="email"], input[aria-label="Email"], input[placeholder*="Email"], input[type="text"]';
            const passwordSelector = 'input[name="password"], input[aria-label="Password"], input[placeholder*="Password"], input[type="password"]';

            console.log("⏳ Waiting for email input field...");
            await loginFrame.waitForSelector(emailSelector, { timeout: 20000 });

            console.log("✅ Email input field found! Filling credentials...");
            await loginFrame.fill(emailSelector, 'ajiewibowo@pm.me');

            console.log("⏳ Waiting for password input field...");
            await loginFrame.waitForSelector(passwordSelector, { timeout: 20000 });

            console.log("✅ Password input field found! Filling credentials...");
            await loginFrame.fill(passwordSelector, 'SmartLink#@6969');

            console.log("🔘 Clicking login button...");
            await loginFrame.click('button[type="submit"]');
            break;
        }
    }

    if (!loginFrame) {
        throw new Error("❌ Login iframe not found!");
    }

    console.log("⏳ Waiting to return to main page context...");
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    console.log("✅ Successfully logged in!");
}

module.exports = { loginToPictory };
