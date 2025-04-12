const { chromium } = require('playwright');
const { loginToPictory } = require('./login-helper');
const path = require('path');
const fs = require('fs');

const runPictoryJob = async (videoTitle, videoScript) => {
    const browser = await chromium.launch({ headless: true });
    const downloadPath = path.resolve(__dirname, 'downloads');

    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }

    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();

    try {
        console.log("🚀 Navigating to login page...");
        await loginToPictory(page);

        console.log("🎥 Click Text to Video");
        await page.locator('span:has-text("Text to video")').click();

        console.log("📝 Fill title & script");

        // // Isi judul
        // await page.waitForSelector('#idTxtScriptName', { timeout: 60000 });
        // await page.fill('#idTxtScriptName', videoTitle);

        // // Isi script dengan aman
        // const scriptEditor = page.locator('div.ck-editor__editable[contenteditable="true"]');
        // await scriptEditor.click();
        // await scriptEditor.fill(' '); // trigger editor
        // await scriptEditor.press('Backspace');
        // await scriptEditor.type(videoScript, { delay: 20 });

        console.log("📝 Entering video name...");
    await page.locator('#idTxtScriptName').fill("Zero to Hero Golang");

    console.log("📝 Entering video script...");
    await page.locator('div.ck-editor__editable[contenteditable="true"]').click();
    await page.keyboard.type("Step Learning Coding Golang via Udemy", { delay: 100 });


    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔎 Attempt ${attempt}: waiting for 'Proceed' button...`);
          const proceedBtn = page.locator('button:has-text("Proceed")');
          await proceedBtn.waitFor({ state: 'visible', timeout: 60000 });
          await proceedBtn.click();
          break;
        } catch (err) {
          console.warn(`⚠️ Proceed button not ready (attempt ${attempt}), retrying...`);
          if (attempt === 3) throw err;
          await page.waitForTimeout(5000); // small delay before retry
        }
      }
        

        console.log("⏳ Wait for Generate button");
        await page.waitForSelector('#btnGenerate', { timeout: 120000 });
        await page.locator('#btnGenerate').click();

        console.log("⏳ Wait for Download button");
        await page.waitForSelector('button.download-without-watermark-btn', { timeout: 600000 });

        const dropdown = page.locator('#generate-button-dropdown');
        await dropdown.hover();
        await dropdown.click();

        console.log("📥 Click Download Without Watermark...");
        await page.locator('button.download-without-watermark-btn').click();

        console.log("🎯 Waiting for 'Your video is now ready!' modal...");
        await page.waitForSelector('span:has-text("Your video is now ready!")', { timeout: 600000 });

        const finalDownloadButton = page.locator('button.css-1145mn4');
        await finalDownloadButton.waitFor({ state: 'visible', timeout: 60000 });

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            finalDownloadButton.click(),
        ]);

        const filePath = path.join(downloadPath, await download.suggestedFilename());
        await download.saveAs(filePath);

        console.log(`✅ Download completed! Saved at: ${filePath}`);
    } catch (err) {
        console.error("❌ Error inside runPictoryJob:", err.message);

        // Simpan screenshot dan konten halaman buat debug
        const timestamp = Date.now();
        await page.screenshot({ path: `error-${timestamp}.png`, fullPage: true });

        const html = await page.content();
        fs.writeFileSync(`debug-${timestamp}.html`, html);

        throw err;
    } finally {
        await context.close();
        await browser.close();
    }
};

module.exports = { runPictoryJob };
