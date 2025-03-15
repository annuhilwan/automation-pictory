const { test, expect } = require('@playwright/test');

test('Login to Pictory', async ({ page }) => {
    console.log("🚀 Navigating to login page...");
    await page.goto('https://app.pictory.ai/login', { waitUntil: 'networkidle' });

    console.log("⏳ Checking for iframes...");
    const frames = page.frames();
    console.log(`🖼️ Found ${frames.length} frames`);

    let loginFrame = null;
    const emailSelector = 'input[name="email"], input[aria-label="Email"], input[placeholder*="Email"], input[type="text"]';

    for (const frame of frames) {
        const frameUrl = frame.url();
        console.log(`🔍 Checking Frame URL: ${frameUrl}`);

        if (frameUrl.includes('auth') || frameUrl.includes('login')) {
            loginFrame = frame;
            console.log('🔐 Found login frame');

            // Ensure iframe is fully loaded
            await loginFrame.waitForLoadState('domcontentloaded');
            await loginFrame.waitForTimeout(3000);

            // Debug: Log iframe content
            const frameHtml = await loginFrame.content();
            console.log("🔍 Frame HTML Content:\n", frameHtml);

            console.log("⏳ Waiting for email input field...");
            await loginFrame.waitForSelector(emailSelector, { timeout: 20000 });

            console.log("✅ Email input field found! Filling credentials...");
            await loginFrame.click(emailSelector);
            await loginFrame.fill(emailSelector, 'ajiewibowo@pm.me');

            console.log("⏳ Waiting for password input field...");
            const passwordSelector = 'input[name="password"], input[aria-label="Password"], input[placeholder*="Password"], input[type="password"]';
            await loginFrame.waitForSelector(passwordSelector, { timeout: 20000 });

            console.log("✅ Password input field found! Filling credentials...");
            await loginFrame.click(passwordSelector);
            await loginFrame.fill(passwordSelector, 'SmartLink#@7878');

            console.log("🔘 Clicking login button...");
            await loginFrame.click('button[type="submit"]');
            break;
        }
    }

    if (!loginFrame) {
        console.log("❌ Login iframe not found!");
        return;
    }

    console.log("⏳ Waiting to return to main page context...");
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    console.log("⏳ Checking if login was successful...");
    await page.waitForSelector('.dashboard-container', { timeout: 20000 });

    console.log("✅ Successfully logged in!");
});
