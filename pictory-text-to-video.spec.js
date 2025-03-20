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

//succes download with click download 

// const { test } = require('@playwright/test');
// const { loginToPictory } = require('./login-helper');
// const path = require('path');
// const fs = require('fs');

// test('Automate Text to Video on Pictory.ai', async ({ page }) => {
//     await loginToPictory(page);

//     console.log("⏳ Waiting for dashboard to load...");
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(5000);

//     console.log("🎥 Clicking 'Text to Video' button...");
//     await page.locator('//span[contains(text(), "Text to video")]').click();

//     console.log("📝 Entering video name...");
//     await page.locator('#idTxtScriptName').fill("Zero to Hero Javascript");

//     console.log("📝 Entering video script...");
//     await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
//     await page.keyboard.type("Step Learning Coding Javascript via Udemy", { delay: 50 });

//     console.log("🚀 Clicking 'Proceed'...");
//     await page.locator('//button[contains(text(), "Proceed")]').click();

//     console.log("⏳ Waiting for 'Download' button to appear...");
//     await page.waitForFunction(() => {
//         return document.querySelector('button.download-without-watermark-btn') !== null;
//     }, { timeout: 600000 });
//     console.log("✅ Download button appeared!");

//     const downloadButton = page.locator('button.download-without-watermark-btn');
//     console.log("🎬 Starting download...");
    
//     const downloadPath = path.resolve(__dirname, 'downloads');
//     if (!fs.existsSync(downloadPath)) {
//         fs.mkdirSync(downloadPath, { recursive: true });
//     }

//     const [download] = await Promise.all([
//         page.waitForEvent('download'),
//         downloadButton.click()
//     ]);

//     const filePath = path.join(downloadPath, await download.suggestedFilename());
//     await download.saveAs(filePath);

//     console.log(`✅ Video downloaded to: ${filePath}`);
// });

///success generate download button

// const { test } = require('@playwright/test');
// const { loginToPictory } = require('./login-helper');
// const path = require('path');
// const fs = require('fs');

// test('Automate Text to Video on Pictory.ai', async ({ page }) => {
//     await loginToPictory(page);

//     console.log("⏳ Waiting for dashboard to load...");
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(5000);

//     console.log("🎥 Clicking 'Text to Video' button...");
//     await page.locator('//span[contains(text(), "Text to video")]').click();

//     console.log("📝 Entering video name...");
//     await page.locator('#idTxtScriptName').fill("Zero to Hero Javascript");

//     console.log("📝 Entering video script...");
//     await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
//     await page.keyboard.type("Step Learning Coding Javascript via Udemy", { delay: 50 });

//     console.log("🚀 Clicking 'Proceed'...");
//     await page.locator('//button[contains(text(), "Proceed")]').click();

//     // 🔥 Click "Generate" button if needed
//     console.log("⏳ Checking for 'Generate' button...");
//     const generateButton = page.locator('#btnGenerate'); // Update if needed
//     if (await generateButton.isVisible()) {
//         console.log("🔘 Clicking 'Generate'...");
//         await generateButton.click();
//     }

//     console.log("⏳ Waiting for 'Download' button to appear...");
//     await page.waitForFunction(() => {
//         return document.querySelector('button.download-without-watermark-btn') !== null;
//     }, { timeout: 600000 });
//     console.log("✅ Download button appeared!");

//     console.log("🎯 Hovering over dropdown before clicking download...");
//     await page.locator('#generate-button-dropdown').hover();
//     await page.waitForTimeout(2000); // Wait a bit to ensure dropdown appears

//     const downloadButton = page.locator('button.download-without-watermark-btn');
//     console.log("🎬 Starting download...");

//     const downloadPath = path.resolve(__dirname, 'downloads');
//     if (!fs.existsSync(downloadPath)) {
//         fs.mkdirSync(downloadPath, { recursive: true });
//     }

//     const [download] = await Promise.all([
//         page.waitForEvent('download'),
//         downloadButton.click()
//     ]);

//     const filePath = path.join(downloadPath, await download.suggestedFilename());
//     await download.saveAs(filePath);
//     console.log(`✅ Video downloaded to: ${filePath}`);

//     // 🔥 Click Second "Download" Button (if needed)
//     console.log("⏳ Checking for second 'Download' button...");
//     const secondDownloadButton = page.locator('button:has-text("Download")');

//     try {
//         await secondDownloadButton.waitFor({ state: 'attached', timeout: 10000 });

//         if (await secondDownloadButton.isVisible()) {
//             console.log("📥 Clicking second 'Download' button...");
//             await secondDownloadButton.scrollIntoViewIfNeeded();
//             await secondDownloadButton.click({ force: true });
//             console.log("✅ Second 'Download' button clicked!");
//         } else {
//             console.log("❌ Second 'Download' button is NOT visible!");
//         }
//     } catch (error) {
//         console.log("⚠️ Second 'Download' button not found!");
//     }

//     // 🔥 Keep Browser Open for Debugging
//     await page.pause();
// });

//download succes
// const { test } = require('@playwright/test');
// const { loginToPictory } = require('./login-helper');
// const path = require('path');
// const fs = require('fs');

// test('Automate Text to Video on Pictory.ai', async ({ page, browser }) => {
//     await loginToPictory(page);

//     console.log("⏳ Waiting for dashboard to load...");
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(5000);

//     console.log("🎥 Clicking 'Text to Video' button...");
//     await page.locator('span:has-text("Text to video")').click();

//     console.log("📝 Entering video name...");
//     await page.locator('#idTxtScriptName').fill("Zero to Hero Javascript");

//     console.log("📝 Entering video script...");
//     await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
//     await page.keyboard.type("Step Learning Coding Javascript via Udemy", { delay: 50 });

//     console.log("🚀 Clicking 'Proceed'...");
//     await page.locator('button:has-text("Proceed")').click();

//     console.log("⏳ Checking for 'Generate' button...");
//     const generateButton = page.locator('#btnGenerate');
//     if (await generateButton.isVisible()) {
//         console.log("🔘 Clicking 'Generate'...");
//         await generateButton.click();
//     }

//     console.log("⏳ Waiting for 'Download' button to appear...");
//     await page.waitForFunction(() => {
//         return document.querySelector('button.download-without-watermark-btn') !== null;
//     }, { timeout: 600000 });

//     console.log("✅ Download button appeared!");

//     // Create a downloads directory if it doesn't exist
//     const downloadPath = path.resolve(__dirname, 'downloads');
//     if (!fs.existsSync(downloadPath)) {
//         fs.mkdirSync(downloadPath, { recursive: true });
//     }

//     console.log("🎯 Hovering over dropdown before clicking download...");
//     await page.locator('#generate-button-dropdown').hover();
//     await page.waitForTimeout(2000);

//     const downloadButton = page.locator('button.download-without-watermark-btn');
//     console.log("📥 Clicking the dropdown Download button...");

//     console.log("⏳ Checking for available download buttons...");

//     // Define both possible download button locators
//     const oldDownloadButton = page.locator('button.download-without-watermark-btn');
//     const newDownloadButton = page.locator('button.MuiButtonBase-root:has-text("Download")');

//     console.log("⏳ Waiting for 'Preparing your video for download' modal...");
//     await page.waitForSelector('span:has-text("Preparing your video for download")', { timeout: 600000 });

//     // Wait for progress to reach 100%
//     while (true) {
//         const progressText = await page.locator('p.MuiTypography-body1:has-text("%")').textContent();
//         console.log(`📊 Video processing progress: ${progressText}`);

//         if (progressText.includes("100%")) {
//             console.log("✅ Video generation complete!");
//             break;
//         }

//         await page.waitForTimeout(5000); // Wait 5 seconds before checking again
//     }

//     console.log("🎯 Waiting for 'Your video is now ready!' modal...");
//     await page.waitForSelector('span:has-text("Your video is now ready!")', { timeout: 600000 });

//     console.log("📥 Clicking the final 'Download' button...");
//     const finalDownloadButton = page.locator('button.css-1145mn4');
//     await finalDownloadButton.waitFor({ state: 'visible', timeout: 60000 });
//     await finalDownloadButton.click();;

//     console.log("✅ Video download started successfully!");

//     await page.pause(); // Keep browser open for debugging
// });


// const { test } = require('@playwright/test');
// const { loginToPictory } = require('./login-helper');
// const path = require('path');
// const fs = require('fs');

// test('Automate Text to Video on Pictory.ai', async ({ browser }) => {
//     // Set up a download path
//     const downloadPath = path.resolve(__dirname, 'downloads');

//     // Ensure the downloads folder exists
//     if (!fs.existsSync(downloadPath)) {
//         fs.mkdirSync(downloadPath, { recursive: true });
//     }

//     console.log("📂 Download folder set to:", downloadPath);

//     // Create a new browser context with the download path
//     const context = await browser.newContext({
//         acceptDownloads: true,
//     });

//     // Open a new page in this context
//     const page = await context.newPage();

//     // Login to Pictory
//     await loginToPictory(page);

//     console.log("⏳ Waiting for dashboard to load...");
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(5000);

//     console.log("🎥 Clicking 'Text to Video' button...");
//     await page.locator('span:has-text("Text to video")').click();

//     console.log("📝 Entering video name...");
//     await page.locator('#idTxtScriptName').fill("Zero to Hero Golang");

//     console.log("📝 Entering video script...");
//     await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
//     await page.keyboard.type("Step Learning Coding Golang via Udemy", { delay: 50 });

//     console.log("🚀 Clicking 'Proceed'...");
//     await page.locator('button:has-text("Proceed")').click();

//     console.log("⏳ Checking for 'Generate' button...");
//     const generateButton = page.locator('#btnGenerate');
//     if (await generateButton.isVisible()) {
//         console.log("🔘 Clicking 'Generate'...");
//         await generateButton.click();
//     }

//     console.log("⏳ Waiting for 'Download' button to appear...");
//     await page.waitForFunction(() => {
//         return document.querySelector('button.download-without-watermark-btn') !== null;
//     }, { timeout: 600000 });

//     console.log("✅ Download button appeared!");

//     console.log("🎯 Hovering over dropdown before clicking download...");
//     await page.locator('#generate-button-dropdown').hover();
//     await page.waitForTimeout(2000);

//     const downloadButton = page.locator('button.download-without-watermark-btn');
//     console.log("📥 Clicking the dropdown Download button...");


//     console.log("🎯 Waiting for 'Your video is now ready!' modal...");
//     await page.waitForSelector('span:has-text("Your video is now ready!")', { timeout: 600000 });

//     console.log("📥 Clicking the final 'Download' button...");
//     const finalDownloadButton = page.locator('button.css-1145mn4');
//     await finalDownloadButton.waitFor({ state: 'visible', timeout: 60000 });
//     await finalDownloadButton.click();;

//     // console.log("📥 Clicking the dropdown Download button...");
//     // const finalDownloadButton = page.locator('button.css-1145mn4');

//     // Wait for the download event
//     const [download] = await Promise.all([
//         page.waitForEvent('download'),
//         finalDownloadButton.click(), // Click the button
//     ]);

//     console.log("📥 Download started...");

//     // Save the downloaded file in the "downloads" folder
//     const filePath = path.join(downloadPath, await download.suggestedFilename());
//     await download.saveAs(filePath);

//     console.log(`✅ Download completed! File saved at: ${filePath}`);

//     await context.close(); // Close the context to end the session
// });


const { test } = require('@playwright/test');
const { loginToPictory } = require('./login-helper');
const path = require('path');
const fs = require('fs');

test('Automate Text to Video on Pictory.ai', async ({ browser }) => {
    // Set up a download path
    const downloadPath = path.resolve(__dirname, 'downloads');

    // Ensure the downloads folder exists
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }

    console.log("📂 Download folder set to:", downloadPath);

    // Create a new browser context with the download path
    const context = await browser.newContext({
        acceptDownloads: true,
    });

    // Open a new page in this context
    const page = await context.newPage();

    // Login to Pictory
    await loginToPictory(page);

    console.log("⏳ Waiting for dashboard to load...");
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    console.log("🎥 Clicking 'Text to Video' button...");
    await page.locator('span:has-text("Text to video")').click();

    console.log("📝 Entering video name...");
    await page.locator('#idTxtScriptName').fill("Zero to Hero Golang");

    console.log("📝 Entering video script...");
    await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
    await page.keyboard.type("Step Learning Coding Golang via Udemy", { delay: 50 });

    console.log("🚀 Clicking 'Proceed'...");
    await page.locator('button:has-text("Proceed")').click();

    console.log("⏳ Checking for 'Generate' button...");
    const generateButton = page.locator('#btnGenerate');
    if (await generateButton.isVisible()) {
        console.log("🔘 Clicking 'Generate'...");
        await generateButton.click();
    }

    console.log("⏳ Waiting for 'Download' button to appear...");
    await page.waitForFunction(() => {
        return document.querySelector('button.download-without-watermark-btn') !== null;
    }, { timeout: 600000 });
    console.log("✅ Download button appeared!");


    // console.log("⏳ Waiting for 'Download' button to appear...");
    // await page.waitForFunction(() => {
    //     return document.querySelector('button.download-without-watermark-btn') !== null;
    // }, { timeout: 600000 });
    // console.log("✅ Download button appeared!");

    // console.log("🎯 Hovering over dropdown before clicking download...");
    // await page.locator('#generate-button-dropdown').hover();
    // await page.waitForTimeout(2000); // Wait a bit to ensure dropdown appears

    // const downloadButton = page.locator('button.download-without-watermark-btn');
    // console.log("🎬 Starting download...");


    //1
    // console.log("🎯 Hovering over dropdown before clicking download...");
    // await page.locator('#generate-button-dropdown').hover();
    // await page.waitForTimeout(2000);

    // console.log("📥 Clicking 'Download Without Watermark' button...");
    // await page.locator('button.download-without-watermark-btn').click();


    //2
    // console.log("🎯 Hovering over dropdown before clicking download...");
    // await page.locator('#generate-button-dropdown').hover();
    // await page.waitForTimeout(2000); // Wait for dropdown to expand

    // console.log("📥 Clicking 'Download Without Watermark' button...");
    // await page.locator('button.download-without-watermark-btn').waitFor({ state: 'visible' });
    // await page.locator('button.download-without-watermark-btn').click();

    //3
    console.log("🎯 Hovering over dropdown before clicking download...");
    const dropdownButton = page.locator('#generate-button-dropdown');

    await dropdownButton.hover(); // Hover over the dropdown
    await dropdownButton.waitFor({ state: 'visible' }); // Ensure it is visible
    await dropdownButton.click(); // Auto-click the dropdown

    console.log("📥 Clicking 'Download Without Watermark' button...");
    const downloadButton = page.locator('button.download-without-watermark-btn');
    await downloadButton.waitFor({ state: 'visible' }); // Ensure the button is visible
    await downloadButton.click(); // Click the button


    // console.log("🎯 Hovering over dropdown before clicking download...");
    // await page.locator('#generate-button-dropdown').hover(); // Hover over the dropdown
    // await page.waitForTimeout(2000); // Allow dropdown to expand

    // console.log("📥 Clicking 'Download Without Watermark' button...");
    // const downloadButton = page.locator('button.download-without-watermark-btn');

    // await downloadButton.waitFor({ state: 'visible' }); // Ensure it is visible
    // await downloadButton.click(); // Auto-click download button

    console.log("🎯 Waiting for 'Your video is now ready!' modal...");
    await page.waitForSelector('span:has-text("Your video is now ready!")', { timeout: 600000 });

    console.log("📥 Clicking the final 'Download' button...");
    const finalDownloadButton = page.locator('button.css-1145mn4');
    await finalDownloadButton.waitFor({ state: 'visible', timeout: 60000 });

    // Wait for the download event
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        finalDownloadButton.click(), // Click the button
    ]);

    console.log("📥 Download started...");

    // Save the downloaded file in the "downloads" folder
    const filePath = path.join(downloadPath, await download.suggestedFilename());
    await download.saveAs(filePath);

    console.log(`✅ Download completed! File saved at: ${filePath}`);

    await context.close(); // Close the context to end the session
});
