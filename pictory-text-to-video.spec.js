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

    console.log("🎯 Hovering over dropdown before clicking download...");
    const dropdownButton = page.locator('#generate-button-dropdown');

    await dropdownButton.hover(); // Hover over the dropdown
    await dropdownButton.waitFor({ state: 'visible' }); // Ensure it is visible
    await dropdownButton.click(); // Auto-click the dropdown

    console.log("📥 Clicking 'Download Without Watermark' button...");
    const downloadButton = page.locator('button.download-without-watermark-btn');
    await downloadButton.waitFor({ state: 'visible' }); // Ensure the button is visible
    await downloadButton.click(); // Click the button



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
