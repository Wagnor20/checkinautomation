const { test, expect } = require('@playwright/test');
const users = [
    { username: 'megha', password: 'xyz' },
    { username: 'akash', password: 'abc' },
    { username: 'simran', password: 'abc' }
];

test('Check URL with Multiple Logins', async ({ page }) => {
    for (const user of users) {
        console.log(`Logging in as ${user.username}...`);

        // Navigate to the login page
        await page.goto('https://erp.atriina.com/login#login');
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL("https://erp.atriina.com/login#login");

        // Fill in login credentials
        await page.locator("//input[@id='login_email']").click();
        await page.locator("//input[@id='login_email']").fill(user.username);

        await page.locator("//input[@id='login_password']").click();
        await page.locator("//input[@id='login_password']").fill(user.password);

        // Click the login button
        await page.locator("//button[@type='submit'][normalize-space()='Login']").click();

        // Verify login (e.g., check the presence of a dashboard element or successful redirection)
        await page.waitForSelector("//input[@id='navbar-search']", { timeout: 5000 });

        console.log(`${user.username} logged in successfully!`);

        // Perform post-login actions
        await page.locator("//input[@id='navbar-search']").click();
        await page.locator("//input[@id='navbar-search']").fill('employee chec');
        await page.waitForSelector("//body[1]/div[1]/header[1]/div[1]/div[1]/form[1]/div[1]/div[1]/ul[1]/li[2]/a[1]");

        const fromCheckin = await page.$$("//body[1]/div[1]/header[1]/div[1]/div[1]/form[1]/div[1]/div[1]/ul[1]/li[2]/a[1]");
        for (let option of fromCheckin) {
            const value = await option.textContent();
            console.log(value);
            if (value.includes('New Employee Checkin')) {
                await option.click();
                break; // Break the loop after clicking the desired option
            }
        }

        // Interact with the dropdown
        await page.locator("//select[@class='input-with-feedback form-control ellipsis']").click();
        await page.locator("//select[@class='input-with-feedback form-control ellipsis']").selectOption({ label: 'IN' });

        // Optional: Wait for changes or capture a screenshot for verification
        await page.waitForTimeout(5000);
        await page.screenshot({ path: `screenshot-${user.username}.png` });

        console.log(`${user.username} actions completed. Logging out...`);

        // Log out if needed (implement your logout logic here)
        // Example: await page.locator("//a[@id='logout-button']").click();

        // Clear cookies and storage before the next iteration (optional, for isolated sessions)
        await page.context().clearCookies();
        await page.context().clearStorage();
    }
});
