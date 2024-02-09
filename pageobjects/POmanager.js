const {LoginPage} = require ('./LoginPage');
const {DashBoardPage} = require ('./DashBoardPage');
const {CartPage} = require('./CartPage');
const {OrderHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');




class POmanager{

constructor(page){

    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.ordersHistoryPage = new OrderHistoryPage(this.page);


}

getLoginPage(){
    return this.loginPage;

}
getDashboard(){
    return this.dashboardPage;

} 

getCartPage(){
    return this.cartPage;

}

getOrdersReviewPage(){
    return this.ordersReviewPage;
}

getOrdersHistoryPage(){
    return this.ordersHistoryPage;
}

}
module.exports = {POmanager};
