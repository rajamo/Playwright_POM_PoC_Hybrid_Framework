import test, { expect, Locator, Page } from "@playwright/test";
const testdata = JSON.parse(JSON.stringify(require('../test-data/testdata.json')));

export default class AdminAmendCustomerDetailsPage {
    private page: Page;
    readonly adminUserID: Locator;
    readonly adminPasswrod: Locator;
    readonly btnAdminLogin: Locator;
    readonly AdminHomeTitle: Locator;
    readonly customersMenu: Locator;
    readonly customerDetailsMenu: Locator;
    readonly customerForenames: Locator;
    readonly customerSurname: Locator;
    readonly customerUserId: Locator;
    readonly btnCustomerSearch: Locator;
    readonly noSearchResultText: Locator;
    readonly customerSearchResult: Locator;

    readonly modify: Locator;
    readonly amendCustomerSurname: Locator;
    readonly btnCustomerSave: Locator;
    readonly personalDetails: Locator;
    readonly checkCustomerSurname: Locator;

    constructor(page: Page) {
        this.page = page;

        this.adminUserID = page.getByPlaceholder('User ID');
        this.adminPasswrod = page.getByPlaceholder('Password');
        this.btnAdminLogin = page.getByRole('button', { name: 'Login' });
        this.AdminHomeTitle = page.getByRole('heading', { name: 'Welcome to MV Genesis' });
        this.customersMenu =  page.getByRole('link', { name: ' Customers' });
        this.customerDetailsMenu = page.getByRole('link', { name: 'Customer Details' });
        this.customerForenames = page.getByLabel('Forenames');
        this.customerSurname = page.getByLabel('Surname');
        this.customerUserId = page.getByLabel('User Id');
        this.btnCustomerSearch = page.getByRole('button', { name: 'Search' });
        this.noSearchResultText = page.getByText('Sorry no results found');
        this.customerSearchResult = page.getByRole('cell', { name:/[0-9]/});

        this.modify = page.getByRole('link', { name: 'Modify' });
        this.amendCustomerSurname = page.locator('#Surname');
        this.btnCustomerSave = page.getByRole('button', { name: 'Save Changes' });
        this.personalDetails = page.getByRole('link', { name: 'Personal Details' });
        this.checkCustomerSurname = page.locator('#customer-surname');
      

    }


    async GotoWebURL(web_url,testInfo){

        await test.step(`Navigate to Web URL-`+web_url,async ()=>{
            await this.page.goto(web_url);
            await this.page.waitForTimeout(500);
            await testInfo.attach('Admin Login Web Page', { body: await this.page.screenshot(), contentType: 'image/png' });       
        });
    }

    async AdminLogin(testInfo) {

        await test.step(`Enter Admin Username `+testdata.onlineadmin.username,async() =>{
            await this.adminUserID.fill(testdata.onlineadmin.username);
        });

        await test.step(`Enter Admin Password-`+testdata.onlineadmin.password,async () => {
            await this.adminPasswrod.fill(testdata.onlineadmin.password);
        });

        await test.step(`Click Admin Login`,async () => {
            await testInfo.attach('Admin Login Online Page', { body: await this.page.screenshot(), contentType: 'image/png' })
            await this.btnAdminLogin.click();
            await this.page.waitForTimeout(1000);
            
        });

        await test.step(`Verify Admin Login`,async () => {
            await expect( this.AdminHomeTitle).toBeVisible();
            await testInfo.attach('Admin Home Online Page', { body: await this.page.screenshot(), contentType: 'image/png' });
        });
    }

    async CustomerSearch(testInfo){
        await test.step(`Select Customers drop down `,async() =>{
            await this.customersMenu.click();
            await testInfo.attach('Customers Menu drop down selection', { body: await this.page.screenshot(), contentType: 'image/png' });
            
        });

        await test.step(`Select Customer Details drop down `,async() =>{
            await this.customerDetailsMenu.click();
            await testInfo.attach('Customers details Menu drop down selection', { body: await this.page.screenshot(), contentType: 'image/png' });
        });

        await test.step(`Enter customer forename-`+testdata.customerdetails.forename,async() =>{
            await this.customerForenames.fill(testdata.customerdetails.forename);
        });

        await test.step(`Enter customer user id-`+testdata.customerdetails.userid,async() =>{
            await this.customerUserId.fill(testdata.customerdetails.userid);
        });

        await test.step(`Click customer search`,async() =>{
            await this.btnCustomerSearch.click();
            await testInfo.attach('Customers search result', { body: await this.page.screenshot(), contentType: 'image/png' });
        });

        await test.step(`Verify customer search result`,async () => {
            await expect( this.noSearchResultText).not.toBeVisible();
            await testInfo.attach('Admin Home Online Page', { body: await this.page.screenshot(), contentType: 'image/png' });
            await this.customerSearchResult.nth(0).click();
            await this.page.waitForTimeout(800);
            await testInfo.attach('Intertnet banking details', { body: await this.page.screenshot(), contentType: 'image/png' });
        });

        await test.step(`Capture current customer surname`,async() =>{
            await this.personalDetails.click();
            await testInfo.attach('Personal details', { body: await this.page.screenshot(), contentType: 'image/png' });
            await expect(this.checkCustomerSurname).toHaveText(testdata.customerdetails.surname);
        });

        await test.step(`Click Modify menu`,async() =>{
            await this.modify.click();
            await testInfo.attach('Before Surname Change', { body: await this.page.screenshot(), contentType: 'image/png' });
        });

        await test.step(`Amend Customer Surname`,async() =>{
            await this.amendCustomerSurname.fill(testdata.customerdetails.newsurname);
            await testInfo.attach('After Surname Changed', { body: await this.page.screenshot(), contentType: 'image/png' });
            await this.btnCustomerSave.click();
            await this.page.waitForTimeout(800);
        });

        await test.step(`Verify customer surname amendement`,async() =>{
            await this.personalDetails.click();
            await testInfo.attach('Personal details', { body: await this.page.screenshot(), contentType: 'image/png' });
            await expect(this.checkCustomerSurname).toHaveText(testdata.customerdetails.newsurname);
        });



    }
}
