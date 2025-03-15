const { test } = require('@playwright/test');
const { loginToPictory } = require('./login-helper'); // Import login function

test('Automate Text to Video Creation on Pictory.ai', async ({ page }) => {
    // Step 1: Login
    await loginToPictory(page);

    // Step 2: Ensure the dashboard is loaded
    console.log("⏳ Waiting for dashboard to load...");
    await page.waitForSelector('.dashboard-container', { timeout: 30000 });

    console.log("🎥 Navigating to Text to Video...");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Debugging: Print page content and screenshot
    console.log("🛠 Debugging: Checking page content after login...");
    console.log(await page.content());
    await page.screenshot({ path: 'debug.png', fullPage: true });

    // Step 3: Click "Text to Video" Button
    const textToVideoSelector = 'button:has-text("Text to Video")';

    try {
        await page.waitForSelector(textToVideoSelector, { timeout: 30000, state: 'visible' });
        console.log("✅ 'Text to Video' button found!");
    } catch (error) {
        console.log("❌ Button not found! Trying alternative selectors...");
        await page.screenshot({ path: 'text-to-video-not-found.png', fullPage: true });
    }

    // Click the button
    await page.click(textToVideoSelector);
    console.log("✅ Successfully navigated to 'Text to Video'!");

    // Step 4: Enter the text content
    console.log("📝 Entering text for video creation...");
    const textInputSelector = 'textarea'; // Change this if the text area selector is different
    await page.waitForSelector(textInputSelector, { timeout: 10000, state: 'visible' });
    
    const videoText = `Pictory.ai is an AI-powered video creation tool that allows users to generate videos from text, URLs, and images. It automates video editing and enhances storytelling.`;
    
    await page.fill(textInputSelector, videoText);

    // Step 5: Click Proceed
    console.log("🚀 Starting text-to-video generation...");
    const proceedButtonSelector = 'button:has-text("Proceed")';
    await page.waitForSelector(proceedButtonSelector, { timeout: 10000, state: 'visible' });
    await page.click(proceedButtonSelector);

    // Step 6: Wait for video to be processed
    console.log("⏳ Waiting for video to be processed...");
    await page.waitForSelector('text="Your video is ready!"', { timeout: 120000 });

    console.log("✅ Text-to-video creation completed successfully!");
});
