const puppeteer = require('puppeteer');
const env = require('dotenv');
const noOfPost = process.argv[2];

env.config();

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2', });
    // await page.screenshot({ path: 'example.png' });
    await page.waitForSelector('input[name="username"]', { visible: true });
    await page.type('input[name="username"]', process.env.INSTA_USER, { waitUntil: 'networkidle2', delay: 100 });
    await page.type('input[name="password"]', process.env.INSTA_PASSWORD, { waitUntil: 'networkidle2', delay: 100 });
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('button[type="submit"]')
    ]);
    await page.waitForSelector('.aOOlW', { visible: true });
    await Promise.all([
        page.waitForSelector(".HoLwm"),
        page.click('button.HoLwm')
    ]);
    await page.waitForSelector('input[placeholder="Search"]', { visible: true });
    const users = ['vishal.rajputz'];
    for (let j = 0; j < users.length; j++) {
        const user = users[j];
        await page.type('input[placeholder="Search"]', user, { waitUntil: 'networkidle2', delay: 100 });
        await page.waitForSelector('.-qQT3', { visible: true });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('.-qQT3')
        ]);

        await page.waitForSelector('.eLAPa', { visible: true });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('.eLAPa')
        ]);
        let i = 0;
        do {
            await page.waitForSelector('.QBdPU span', { visible: true });
            await Promise.all([
                page.click('.QBdPU span')
            ]);
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click('._65Bje.coreSpriteRightPaginationArrow')
            ]);
            i++;
        } while (i < noOfPost);
    }

    // await browser.close();
})();

