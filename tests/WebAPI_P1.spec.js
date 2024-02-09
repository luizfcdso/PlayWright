const {test, expect, request} = require ('@playwright/test');

const {APiUtils} = require(
   './utils/APIUtils');

const loginPayload = {userEmail: "luizxtcosta@gmail.com", userPassword: "Test@123"};

let token;
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};

let orderId;

let response;
//qualquer teste que rodar nesse escopo esse vai rodar primeiro, é como se fosse um teste apartado, por isso chama uma função
test.beforeAll( async ()=> {

   const apiContext = await request.newContext();
   const apiUtils =  new APiUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);
});

test ('Client App Login', async({page})=>{
    

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, response.token );
    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".btn.btn-custom[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

     const orders =  await page.locator("tbody tr");

     for (let i=0; i < await orders.count(); ++i){
        const rowOrder = await orders.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrder))
        {
            //Na especifica linha
         await orders.nth(i).locator("button").first().click();
         break;   
        }
     }

     const orderIdDetails = await page.locator(".col-text").textContent();
     await page.pause();
     expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


    
    
});