const { test, expect } = require('@playwright/test');

test("Screenshot and Visual Comparision", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#displayed-text').fill('Luiz Fernando Costa');

    await page.locator('#displayed-text').screenshot({ path: 'screnshootSpecific.jpg' });

    await page.locator('#hide-textbox').click();

    await page.screenshot({ path: 'screenshot.png' });

    await expect(page.locator('#displayed-text')).toBeHidden();



});


test.only ('visual comparasion',async({page})=> {


    await page.goto('https://latamtravel-brasil.decolar.com/');

    //await page.screenshot({path : 'landing.png'})
    expect(await page.screenshot()).toMatchSnapshot('landing.png');


});