const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("luizxtcosta@gmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'}); //voce vai conseguir ter todos os cookies, storages, tokens e tudo que precisa
    webContext = await browser.newContext({storageState: 'state.json'});

});

test ('Client App Login', async()=>{

    const email = "";
    const productName = 'ADIDAS ORIGINAL';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = await page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();

    for(let i=0; i < count; i++){

       if (await products.nth(i).locator("b").textContent() === productName){
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;

       }

    }

    await page.locator("[routerlink*='cart']").click(); 
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible;
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100});
    const dropdown =  page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i=0; i<optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if ( text === ' India'){
            dropdown.locator("button").nth(i).click();
            break;
        }
    
    }
    expect(page.locator(".user__name [type=text]").first()).toHaveText("luizxtcosta@gmail.com");


    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator("label[class='ng-star-inserted']").textContent();

    await page.locator(".btn.btn-custom[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

     const orders =  await page.locator("tbody tr");

     for (let i=0; i < await orders.count(); ++i){
        const rowOrder = await orders.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrder))
        {
            //Na especifica linha
         await orders.nth(i).locator("button").first().click();
         break;   
        }
     }

    await page.pause();
    
});


test ('Client App Login 2', async()=>{

    const email = "";
    const productName = 'ADIDAS ORIGINAL';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = await page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});