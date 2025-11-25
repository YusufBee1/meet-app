/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';

jest.setTimeout(60000);



describe('show/hide event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0,
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see details', async () => {
        await page.click('.event button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
        await page.screenshot({ path: 'screenshots/collapsed-event.png' });
        await page.pdf({ path: 'pdfs/fullpage.pdf', format: 'A4' });
    });
});



describe('Filter events by city', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0,
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        const events = await page.$$('.event');
        expect(events.length).toBeGreaterThan(0);
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Berlin');
        await page.waitForSelector('.suggestions li');
        const suggestions = await page.$$('.suggestions li');
        expect(suggestions.length).toBeGreaterThan(0);
    });

    test('User can select a city from the suggested list', async () => {
        await page.type('.city', 'Berlin');
        await page.waitForSelector('.suggestions li');

        const suggestionItems = await page.$$('.suggestions li');
        for (const suggestion of suggestionItems) {
            const text = await page.evaluate(el => el.textContent, suggestion);
            if (text.includes('Berlin')) {
                await suggestion.click();
                break;
            }
        }

        const cityInputValue = await page.$eval('.city', el => el.value);
        expect(cityInputValue).toContain('Berlin');
    });


});