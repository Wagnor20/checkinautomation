const { test, expect } = require('playwright/test');
const oldVSnewPage = require('../../Pages/oldVSnew');

test('Check URL', async({page}) =>{
 
    await page.goto('https://erp.atriina.com/login#login');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("https://erp.atriina.com/login#login");
    await page.locator("//div[@class='page-card-body']//div[@class='page-card-body']//input[@id='login_email']").click()
    await page.locator("//div[@class='page-card-body']//div[@class='page-card-body']//input[@id='login_email']").fill('simran.nishad@atriina.com')
    await page.locator("//div[@class='page-card-body']//div[@class='page-card-body']//input[@id='login_password']").click()
    await page.locator("//div[@class='page-card-body']//div[@class='page-card-body']//input[@id='login_password']").fill('Simran@1720')
    await page.locator("//div[@class='page-card-body']//button[@type='submit'][normalize-space()='Login']").click()
    await page.locator("//input[@id='navbar-search']").click()
    await page.locator("//input[@id='navbar-search']").fill('employee chec')
    
    await page.waitForSelector("//body[1]/div[1]/header[1]/div[1]/div[1]/form[1]/div[1]/div[1]/ul[1]/li[2]/a[1]")
   // await page.locator("//body[1]/div[1]/header[1]/div[1]/div[1]/form[1]/div[1]/div[1]/ul[1]/li[2]/a[1]").click()
    
    const fromCheckin=await page.$$("//body[1]/div[1]/header[1]/div[1]/div[1]/form[1]/div[1]/div[1]/ul[1]/li[2]/a[1]")

    for(let option of fromCheckin)
    {
        const value=await option.textContent()
        console.log(value);
        if(value.includes('New Employee Checkin'))
        {
            await option.click()
        }
    }
    await page.locator("//select[@class='input-with-feedback form-control ellipsis']").click()
    await page.locator("//select[@class='input-with-feedback form-control ellipsis']").selectOption({label:'IN'});
    await page.waitForTimeout(5000);
});