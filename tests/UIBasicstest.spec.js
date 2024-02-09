const {test, expect} = require('@playwright/test');
const { title } = require('process');

test.only('Browser Context PlayWright test',async ({browser})=> {
    
    const context = await browser.newContext();
    const page =  await context.newPage();
    //**/*.css <- poderia colocar dessa forma para bloquear os CSS
   // page.route('**/*.{jpg, jpeg, png}',
    //route => route.abort());
    const userName = page.locator("#username");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   // console.log (await page.locator("[style*='block']").textContent());
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect .');
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    // console.log(await cardTitles.nth(1).textContent());//.first also work to get first name of the product
    //  console.log(await cardTitles.first().textContent());
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body a').first().waitFor();
        
    const titles = await page.locator('.card-body a').allTextContents();
    console.log(titles);

    });

    test ('UI Controls', async({page})=>{
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        const docLink = page.locator("[href*='request']");

        await page.locator('#username').fill('rahulshettyacademy');
        await page.locator("#password").fill("learning");
        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption('consult');
        await page.locator('.checkmark').last().click();
        await page.locator('#okayBtn').click();
        expect(page.locator('.checkmark').last()).toBeChecked();//esse assertion é mais utilizado
        await page.locator("#terms").click();
        expect(page.locator('#terms')).toBeChecked();
        await expect(docLink).toHaveAttribute("class","blinkingText");
        //console.log(await page.locator('.checkmark').last().isChecked());
       await page.pause();
    });

    test ('Child windows handle', async({browser})=>{

        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        const docLink = page.locator("[href*='request']");
        browser.newPage();

        const [newPage] = await Promise.all([

        context.waitForEvent('page'),//listen for any new page 
        docLink.click(),
        ])//new page is opended
        
        const text = await newPage.locator('.red').textContent();
        const arrayText = text.split("@")
        const email = arrayText[1].split(" ")[0].split(".")[0]
        console.log(email);
        await page.locator('#username').fill(email);
        console.log(await page.locator('#username').textContent());

        await page.pause();

        });


    test ('Client App Login', async({page})=>{

            const productName = 'ADIDAS ORIGINAL';
            const loginUser = "luizxtcosta@gmail.com";
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill(loginUser);
            await page.locator("#userPassword").fill("Test@123");
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');

            const products = await page.locator(".card-body");

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
            expect(page.locator(".user__name [type=text]").first()).toHaveText(loginUser);


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
