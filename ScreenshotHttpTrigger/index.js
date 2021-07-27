const { chromium } = require('playwright-chromium');
const util = require('util');
const fs = require('fs').promises;
const { exec } = require('child_process');
const execAsync = util.promisify(exec);

const fontUpdate = async () => {
    const fontPath = process.env.FONT_PATH || '/home/.fonts';
    try {
        await fs.stat(fontPath);
        return
    } catch {
    }
    // ln -s /home/site/wwwroot/fonts $FONT_PATH
    await execAsync(`ln -s /home/site/wwwroot/fonts ${fontPath}`);
    // fc-cache -fv
    await execAsync("fc-cache -fv");
}

module.exports = async function (context, req) {
    const url = req.query.url;

    await fontUpdate();

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 1280,
        height: 1280,
    });

    await page.goto(url);
    const screenshotBuffer = await page.screenshot();
    await browser.close();

    context.res = {
        status: 200,
        body: screenshotBuffer,
        isRaw: true,
        headers: {
            "Content-Type": "image/png"
        }
    };
}