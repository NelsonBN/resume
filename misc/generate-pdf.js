const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const indexPath = path.resolve(__dirname, './../src/index.html');

    try {
        require.resolve(indexPath);
    } catch (error) {
        console.error(`The file ${indexPath} does not exist.`);
        process.exit(1);
    }

    await page.goto(`file://${indexPath}`, {waitUntil: 'networkidle2'});

    await page.pdf({path: 'resume.pdf', format: 'A4'});

    await browser.close();
})();
