class DashBoardPage{

    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct (productName)
    {

        //const titles = await this.productsText.allTextContexts();
        //console.log(titles);

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;

            }

        }
    }

    async navigateToOrders(){
        await this.orders.click();
        
    }

    async navigateToCart(){
        //this.goToCart = await page.locator("[routerlink*='cart']").click();
        await this.cart.click();
    }

}

module.exports = {DashBoardPage};