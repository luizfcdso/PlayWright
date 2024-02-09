const {test, expect} = require('@playwright/test');
const { title } = require('process');

test('Popup validations',async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();// volta para a pagina anterior / goForward vai para a pagina posterior.
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    page.on('dialog', dialog => dialog.accept());//aceite em um pop up
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framesPage =  page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const text = await framesPage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);
    await page.pause();






    
   
    });

   