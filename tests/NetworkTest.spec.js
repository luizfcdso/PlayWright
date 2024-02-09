const { test, expect, request } = require('@playwright/test');

const { APiUtils } = require(
   './utils/APIUtils');

const loginPayload = { userEmail: "luizxtcosta@gmail.com", userPassword: "Test@123" };

let token;
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };

let orderId;
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;
//qualquer teste que rodar nesse escopo esse vai rodar primeiro, é como se fosse um teste apartado, por isso chama uma função
test.beforeAll(async () => {

   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);
});

test('Client App Login', async ({ page }) => {


   await page.addInitScript(value => {

      window.localStorage.setItem('token', value);

   }, response.token);

   await page.goto("https://rahulshettyacademy.com/client");
   //MEIO QUE CLARO, PRIMEIRO PEGO O QUE EU QUERO FAZER, QUE É ROUTE, SEGUNDO É A FUNÇÃO, O QUE QUERO EXECUTAR
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //* quer dizer que aceita qualquer coisa
      async route => {

         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayloadOrders);
         route.fulfill({
            response,
            body,
         });
         //INTERECEPTING THE RESPONSE -> API Response -> {playwright FakeResponse} ->browser -> render data on front end 

      });
   await page.locator(".btn.btn-custom[routerlink*='myorders']").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   console.log("**********************" + await page.locator(".mt-4").textContent() + "**********************");


});