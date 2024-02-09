const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testDataForOrder : {
    username : "luizxtcosta@gmail.com",
    password : "Test@123", 
    productName : "ADIDAS ORIGINAL"
    
}

}


)