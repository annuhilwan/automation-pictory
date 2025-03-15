// const { test } = require('@playwright/test');
// const { loginToPictory } = require('./login-helper'); // Import login function

// test('Automate Text to Video on Pictory.ai', async ({ page }) => {
//     // Step 1: Login
//     await loginToPictory(page);

//     // Step 2: Ensure dashboard is fully loaded
//     console.log("⏳ Waiting for dashboard to load...");
//     await page.waitForLoadState('networkidle'); 
//     await page.waitForTimeout(5000);

//     // Debugging: Screenshot after login
//     await page.screenshot({ path: 'debug-dashboard.png', fullPage: true });

//     // Step 3: Check if an iframe exists and switch to it
//     console.log("⏳ Checking for iframes...");
//     const frameElement = await page.waitForSelector('iframe', { timeout: 5000 }).catch(() => null);
//     let frame = null;
//     if (frameElement) {
//         frame = await frameElement.contentFrame();
//         console.log("✅ Found an iframe! Switching...");
//     }

//     // Step 4: Find the 'Text to Video' button
//     console.log("🎥 Looking for 'Text to Video' button...");

//     const textToVideoButton = frame
//         ? frame.locator('//span[contains(text(), "Text to video")]')
//         : page.locator('//span[contains(text(), "Text to video")]');

//     // Debugging: Check if element exists before waiting
//     const isVisible = await textToVideoButton.isVisible();
//     const isEnabled = await textToVideoButton.isEnabled();
    
//     console.log(`🔍 Is Visible: ${isVisible}, Is Enabled: ${isEnabled}`);

//     if (!isVisible || !isEnabled) {
//         console.log("❌ 'Text to Video' button not found or not clickable. Taking screenshot...");
//         await page.screenshot({ path: 'debug-text-to-video-not-found.png' });
//         throw new Error("'Text to Video' button not found or disabled!");
//     }

//     // Ensure the button is visible and enabled before clicking
//     await textToVideoButton.waitFor({ state: 'visible', timeout: 10000 });

//     // Debugging: Take a screenshot before clicking
//     await textToVideoButton.screenshot({ path: 'before-click.png' });

//     // Click the button
//     await textToVideoButton.click({ force: true });

//     console.log("✅ Successfully clicked 'Text to Video'!");
// });
const { test } = require('@playwright/test');
const { loginToPictory } = require('./login-helper'); // Import login function

test('Automate Text to Video on Pictory.ai', async ({ page }) => {
    // Step 1: Login
    await loginToPictory(page);

    // Step 2: Ensure dashboard is fully loaded
    console.log("⏳ Waiting for dashboard to load...");
    await page.waitForLoadState('networkidle'); 
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'debug-dashboard.png', fullPage: true });

    // Step 3: Click the "Text to Video" button
    console.log("🎥 Looking for 'Text to Video' button...");
    // Use an XPath selector based on the element structure you provided
    const textToVideoButton = page.locator('//span[contains(text(), "Text to video")]');
    await textToVideoButton.waitFor({ state: 'visible', timeout: 15000 });
    await textToVideoButton.click({ force: true });
    console.log("✅ Successfully clicked 'Text to Video'!");

    // Step 4: Wait for the video creation section to load
    console.log("⏳ Waiting for video creation section to load...");
    await page.waitForTimeout(5000);

    // Step 5: Enter Video Name
    console.log("📝 Entering video name...");
    const videoNameInput = page.locator('#idTxtScriptName');
    await videoNameInput.waitFor({ state: 'visible', timeout: 20000 });
    await videoNameInput.fill("Zero to Hero Javascript");

    // Step 6: Enter Text for the Video Script in CKEditor
    console.log("📝 Entering video script text...");
    // For CKEditor, target the contenteditable div (the editor)
    const editorDiv = page.locator('div.ck-editor__editable[contenteditable="true"]');
    await editorDiv.waitFor({ state: 'visible', timeout: 20000 });
    // Click to focus the editor
    await editorDiv.click();
    // Simulate typing; this will trigger CKEditor's events
    await page.keyboard.type("Step Learning Coding Javascript language, you can learning via Video Tutorial in Udemy", { delay: 50 });
    console.log("✅ Video script text entered!");

    // Step 7: Click the "Proceed" button
    console.log("🚀 Clicking 'Proceed' to generate video...");
    const proceedButton = page.locator('//button[contains(text(), "Proceed")]');
    await proceedButton.waitFor({ state: 'visible', timeout: 10000 });
    await proceedButton.click();
    console.log("✅ 'Proceed' button clicked!");

    // Step 8: Wait for video processing to complete
    console.log("⏳ Waiting for video processing...");
    await page.waitForSelector('text="Your video is ready!"', { timeout: 120000 });
    console.log("✅ Video creation completed successfully!");
});
