const { test, expect, request } = require('@playwright/test');



test('Security test request intercept', async ({ page }) => {

    //login and reach orders page
    const loginUser = "luizxtcosta@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(loginUser);
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const products = await page.locator(".card-body");
    await page.locator(".btn.btn-custom[routerlink*='myorders']").click();

    //Meio que vai replicar o request URL
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65b0f975a86f8f74dc601fc9' }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('.blink_me').last()).toHaveText("You are not authorize to view this order");
    
    //await page.pause();





});