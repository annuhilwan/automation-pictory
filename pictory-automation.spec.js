const { test, expect } = require('@playwright/test');

test('Automate Video Creation on Pictory.ai', async ({ page }) => {
    console.log("🚀 Launching browser and navigating to Pictory.ai...");
    await page.goto('https://app.pictory.ai/login');

    // Step 1: Handle login iframe
    console.log("⏳ Checking for iframes...");
    const frames = page.frames();
    let loginFrame = null;

    for (const frame of frames) {
        const frameUrl = frame.url();
        console.log(`🔍 Checking Frame URL: ${frameUrl}`);
        if (frameUrl.includes('auth') || frameUrl.includes('login')) {
            loginFrame = frame;
            console.log('🔐 Found login frame');
            break;
        }
    }

    if (!loginFrame) {
        throw new Error('❌ Login frame not found');
    }

    // Step 2: Wait for email field
    console.log("⏳ Waiting for email input field...");
    const emailSelector = 'input[type="email"], input[name="email"], input[placeholder*="Email"]';
    await loginFrame.waitForSelector(emailSelector, { timeout: 20000 });

    console.log("✅ Email input field found! Filling credentials...");
    await loginFrame.fill(emailSelector, 'ajiewibowo@pm.me');
    await loginFrame.fill('input[type="password"]', 'SmartLink#@7878');

    // Step 3: Click login button
    console.log("🔘 Clicking login button...");
    await loginFrame.click('button[type="submit"]');

    // Step 4: Wait for navigation to dashboard
    console.log("⏳ Waiting for dashboard to load...");
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    // Step 5: Navigate to video creation section
    console.log("🎥 Navigating to video creation...");
    await page.click('text="Script to Video"'); // Adjust this selector based on UI changes

    // Step 6: Enter the URL for video creation
    console.log("🔗 Entering URL for video creation...");
    await page.fill('input[type="url"]', 'https://www.youtube.com/shorts/mrWzLnjudoM');

    // Step 7: Click submit button to generate the video
    console.log("🚀 Starting video generation...");
    await page.click('button:has-text("Proceed")'); // Adjust selector if needed

    // Step 8: Wait for video processing to complete (adjust timeout as needed)
    console.log("⏳ Waiting for video to be processed...");
    await page.waitForSelector('text="Your video is ready!"', { timeout: 120000 });

    console.log("✅ Video creation completed successfully!");
});
