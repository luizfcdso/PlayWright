const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { title } = require('process');
const {POmanager} = require('../pageobjects/POmanager');
///JSON-> string -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));



for (const data of dataset){
    test (`Client App Login for ${data.productName}`, async({page})=>{


            const poManager = new POmanager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.gotTo();
            await loginPage.validLogin(data.username, data.password);

            const dashboardPage = poManager.getDashboard();
            await dashboardPage.searchProduct(data.productName);
            await dashboardPage.navigateToCart();

            const cartPage = poManager.getCartPage();
            //await cartPage.VerifyProductIsDisplayed(dataset.productName);
            await cartPage.Checkout();

            
            const ordersReviewPage = poManager.getOrdersReviewPage();
            await ordersReviewPage.searchCountryandSelect("ind", "India");
            await ordersReviewPage.VerifyEmailId(data.username);

            const orderId = await ordersReviewPage.SubmitAndGetOdersId();

            console.log(orderId);
            await dashboardPage.navigateToOrders();

            const ordersHistoryPage = poManager.getOrdersHistoryPage();
            await ordersHistoryPage.searchOrderAndSelect(orderId);

            expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    
        });
}

customtest.only (`Client App Login`, async({page, testDataForOrder})=>{


            const poManager = new POmanager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.gotTo();
            await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

            const dashboardPage = poManager.getDashboard();
            await dashboardPage.searchProduct(testDataForOrder.productName);
            await dashboardPage.navigateToCart();

            const cartPage = poManager.getCartPage();
            //await cartPage.VerifyProductIsDisplayed(dataset.productName);
            await cartPage.Checkout();

        });
