const { expect} = require("@playwright/test");
const { exec } = require("child_process");

class OrdersReviewPage{

    constructor(page){
        this.page = page;

        this.country = page.locator("[placeholder*='Country']");
        this.dropdown =  page.locator(".ta-results");
        this.submit = page.locator(".btnn.action__submit.ng-star-inserted");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator("label[class='ng-star-inserted']");
        this.emailId = page.locator(".user__name [type='text']").first();


    }

    async searchCountryandSelect(countryCode, countryName){
        await this.country.type(countryCode, {delay:100});
        await this.dropdown.waitFor();

        const optionsCount = await this.dropdown.locator("button").count();
        for (let i=0; i<optionsCount; i++){
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName){
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        
        }
        

    }

    async VerifyEmailId(username){
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOdersId(){

        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }

}

module.exports = {OrdersReviewPage};