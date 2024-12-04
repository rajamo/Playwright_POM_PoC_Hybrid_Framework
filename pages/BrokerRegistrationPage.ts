import test, { expect, Locator, Page } from "@playwright/test";

const testdata = JSON.parse(JSON.stringify(require('../test-data/testdata.json')));

export default class BrokerRegistrationPage {
  private page: Page;
  readonly btnLogin: Locator;
  readonly btnRegister: Locator;
  readonly btnNext: Locator;
  readonly newRegistration: Locator;
  readonly existingRegistration: Locator;
  readonly brokerEmailID: Locator;
  readonly brokerSelectTitle: Locator;
  readonly brokerFullName: Locator;
  readonly brokerSelectJobTitle: Locator;
  readonly brokerPassword: Locator;
  readonly brokerConfirmPassword: Locator;
  readonly fcaNumber: Locator;
  readonly organisationName: Locator;
  readonly tradingNme: Locator;
  readonly postCode: Locator;
  readonly btnpostCodeLookup: Locator;
  readonly postCodeLookupResults: Locator;
  readonly phoneNumber: Locator;
  readonly networkTitle: Locator;
  readonly mortgageClub: Locator;
  readonly emailInnerText: Locator;
  readonly nameInnerText: Locator;
  readonly fcaInnerText: Locator;
  readonly btnCreateAccount: Locator;
  readonly brokerLoginUsername: Locator;
  readonly brokerLoginPassword: Locator;
  readonly brokerproducts: Locator;
  readonly brokerLendingCriteria: Locator;
  readonly btnbrokerLoggout: Locator;
  readonly brokerproductsHeadings: Locator;
  readonly brokerLendingCriteriaHeadings: Locator;
  readonly mailinbox: Locator;
  readonly mailactivatelink: Locator;
  readonly mailactivated: Locator;
  readonly mailiLogin: Locator;
  readonly mailUsername: Locator;
  readonly mailPassword: Locator;
  readonly mailSignin: Locator;
  readonly mailSearchField: Locator;
  readonly btnmailSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    //****Page 1 -New Registration*/
    this.btnLogin = page.getByRole('button', { name: 'Login' });
    this.btnLogin = page.getByRole('button', { name: 'Login' });
    this.btnRegister = page.getByRole('button', { name: 'Register' });
    this.btnNext = page.getByRole('button', { name: 'Next' });
    this.newRegistration = page.locator('#IsNewOrganisation');
    this.existingRegistration = page.locator('#IsAdvisorToExistingOrganisation');
    this.brokerEmailID = page.getByPlaceholder('Email Address', { exact: true });
    this.brokerSelectTitle = page.getByTitle('Select Title');
    // this.brokerSelectTitle= page.locator(`//select[@name='TitleId']`);
    this.brokerFullName = page.getByPlaceholder('Full Name');
    this.brokerSelectJobTitle = page.getByTitle('Select Job Title');
    this.brokerPassword = page.getByRole('textbox', { name: 'Password', exact: true });
    this.brokerConfirmPassword = page.getByPlaceholder('Confirm Password');

    //****Page 2 - Organisation Details*/
    this.fcaNumber = page.getByPlaceholder('FCA  Number');
    this.organisationName = page.getByPlaceholder('Organisation Name');
    this.tradingNme = page.getByPlaceholder('Trading As Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.btnpostCodeLookup = page.getByRole('button', { name: 'Lookup' });
    this.postCodeLookupResults = page.locator('#addressLookupResults').getByRole('combobox');
    this.phoneNumber = page.getByPlaceholder('Phone Number');
    this.networkTitle = page.getByTitle('Network');
    this.mortgageClub = page.locator('#section-mortgage-clubs').getByRole('list');


    //****Page 3 - Confirmation */

    this.nameInnerText = page.getByPlaceholder('Your Name');
    this.emailInnerText = page.getByPlaceholder('Email/User Name');
    this.fcaInnerText = page.getByPlaceholder('FCA Number');
    this.btnCreateAccount = page.getByRole('button', { name: 'Create Account' });

    //await page.getByText('Email Address', { exact: true }).click();
    // await page.getByText('Name', { exact: true }).click();
    //await page.getByText('FCA Number', { exact: true }).click();

    //**Page 4 - Login Broker */
    this.brokerLoginUsername = page.getByPlaceholder('User Name / Email Address');
    this.brokerLoginPassword = page.getByRole('textbox', { name: 'Password' });

    //**Page 5 - Broker Home */
    this.brokerproducts = page.locator('li').filter({ hasText: 'Products' });
    this.brokerLendingCriteria = page.getByRole('link', { name: ' Lending Criteria' });
    this.btnbrokerLoggout =  page.getByRole('link', { name: '' });
    this.brokerproductsHeadings =  page.getByRole('heading', { name: 'Your Products' });
    this.brokerLendingCriteriaHeadings = page.getByRole('heading', { name: 'Lending Criteria' });

    /***Mailinator Test */
    this.mailiLogin = page.getByRole('link', { name: 'Login' });
    this.mailUsername = page.getByPlaceholder('Email');
    this.mailPassword = page.getByPlaceholder('Password');
    this.mailSignin = page.getByLabel('Login link');
    this.mailinbox = page.getByRole('cell', { name: 'Broker Registration' });
    this.mailactivatelink = page.locator('iframe[name="html_msg_body"]').contentFrame().getByRole('link', { name: 'https://vernbrok-temp.' });
    this.mailactivated = page.getByText('Thank you for registering your account. Your account is now active.');
    this.mailSearchField = page.getByLabel('inbox field');
    this.btnmailSearch = page.getByRole('button', { name: 'GO', exact: true });
  }

  async NewBrokerRegistration(testInfo) {

    //****Page 1 */
    await test.step(`Click broker registration`, async () => {
      await this.btnRegister.click();
      await this.page.waitForTimeout(100);
    });

    await test.step(`Verify broker new registration page`, async () => {
      await expect(this.newRegistration).toBeVisible();
    });
    
    await test.step(`Select New broker registration type and click Next`, async () => {
      await this.newRegistration.click();
      await testInfo.attach('Broker Registration Type', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.btnNext.click();
      await this.page.waitForTimeout(1500);
    });
    
    await test.step(`Enter broker email id-`+testdata.brokerNewRegistrationDetails.emailID, async () => {
      await this.brokerEmailID.fill(testdata.brokerNewRegistrationDetails.emailID);
    });
    
    await test.step(`Select broker title-`+testdata.brokerNewRegistrationDetails.title, async () => {
      await this.brokerSelectTitle.click();
      await this.page.getByRole('treeitem', { name: testdata.brokerNewRegistrationDetails.title, exact: true }).click();
    });
    
    await test.step(`Enter broker full name-`+testdata.brokerNewRegistrationDetails.fullname, async () => {
      await this.brokerFullName.fill(testdata.brokerNewRegistrationDetails.fullname);
    });

    await test.step(`Select broker job title-`+testdata.brokerNewRegistrationDetails.jobtitle, async () => {
      await this.brokerSelectJobTitle.click();
      var Jobfield = this.page.getByRole('treeitem', { name: testdata.brokerNewRegistrationDetails.jobtitle });
      await Jobfield.nth(0).click();
      //await this.page.getByRole('treeitem', { name: testdata.brokerNewRegistrationDetails.jobtitle}).click();
    });
   
    await test.step(`Enter broker login password-`+testdata.brokerNewRegistrationDetails.password, async () => {
      await this.brokerPassword.fill(testdata.brokerNewRegistrationDetails.password);
    });
   
    await test.step(`Enter broker login confirm password-`+testdata.brokerNewRegistrationDetails.password, async () => {
      await this.brokerConfirmPassword.fill(testdata.brokerNewRegistrationDetails.password);
      await testInfo.attach('Broker New Registration Details', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

    await test.step(`Verify the newly entered broker information on the Your Details page`, async () => {
      await this.btnNext.click();
      await this.page.waitForTimeout(800);
      await expect(this.fcaNumber).toBeVisible();
      await testInfo.attach('New Broker Registration: Organisation Details Page_1', { body: await this.page.screenshot(), contentType: 'image/png' });
    });
    
  }


  async BrokerRegistrationOrgnisationDetails(testInfo) {

    //****Page 2 */
    await test.step(`Enter FCA Number-`+testdata.organisationDetails.fcaNumber, async () => {
      await this.fcaNumber.fill(testdata.organisationDetails.fcaNumber);
    });

    await test.step(`Enter Orgnisation Name-`+testdata.organisationDetails.organisationName, async () => {
      await this.organisationName.fill(testdata.organisationDetails.organisationName);
    });
    
    await test.step(`Enter Trading Name-`+testdata.organisationDetails.tradingNme, async () => {
      await this.tradingNme.fill(testdata.organisationDetails.tradingNme);
    });
    
    await test.step(`Enter Postcode and click address lookup for-`+testdata.organisationDetails.postCode, async () => {
      await this.postCode.fill(testdata.organisationDetails.postCode);
      await this.btnpostCodeLookup.click();
      await testInfo.attach('Broker Registration Orgnisation Details_Page_2', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

    await test.step(`Select Postcode from address lookup search-`+testdata.organisationDetails.Address, async () => {
      await this.postCodeLookupResults.selectOption(testdata.organisationDetails.Address);
    });
    
    await test.step(`Enter phone number-`+testdata.organisationDetails.phoneNumber, async () => {
      await this.phoneNumber.fill(testdata.organisationDetails.phoneNumber);
      await testInfo.attach('Broker Registration Orgnisation Details_Page_3', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

    await test.step(`Select network title-`+testdata.organisationDetails.networkTitle, async () => {
      await this.networkTitle.click();
      await this.page.getByRole('treeitem', { name: testdata.organisationDetails.networkTitle, exact: true }).click();
    });

    await test.step(`Select mortgage club-`+testdata.organisationDetails.mortgageClub, async () => {
      await this.mortgageClub.click();
      await this.page.getByRole('treeitem', { name: testdata.organisationDetails.mortgageClub, exact: true }).click();
      await this.page.waitForTimeout(800);
      await testInfo.attach('Broker Registration Orgnisation Details_Page_4', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

    await test.step(`Verify the newly entered broker information on the organisation Details page`, async () => {
      await this.btnNext.click();
      await this.page.waitForTimeout(1800);
      await expect(this.btnCreateAccount).toBeVisible();
      await testInfo.attach('Broker Registration Confirmation Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

  }


  async BrokerRegistrationConfirmation(testInfo) {

    //await expect(this.nameInnerText).toHaveText(testdata.brokerNewRegistrationDetails.fullname);
    //await expect(this.emailInnerText).toHaveText(testdata.brokerNewRegistrationDetails.emailID);
    //await expect(this.fcaInnerText).toHaveText(testdata.organisationDetails.fcaNumber);
    
    await test.step(`Click create account for new broker registration`, async () => {
      await this.btnCreateAccount.click();
      await this.page.waitForTimeout(600);
      await testInfo.attach('New Broker Registration is completed', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

  
  }


  async NewBrokerLogin(testInfo) {
    await test.step(`Enter broker username-`+testdata.brokerNewRegistrationDetails.emailID, async () => {
      await this.brokerLoginUsername.fill(testdata.brokerNewRegistrationDetails.emailID);
    });

    await test.step(`Enter broker password-`+testdata.brokerNewRegistrationDetails.password, async () => {
      await this.brokerLoginPassword.fill(testdata.brokerNewRegistrationDetails.password);
    });

    await test.step(`Click broker login`, async () => {
      await testInfo.attach('Existing Broker Login Page', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.btnLogin.click();
    });

    await test.step(`Verify Broker login`, async () => {
      await this.page.waitForTimeout(800);
      await expect(this.btnbrokerLoggout).toBeVisible();
      await testInfo.attach('Broker Home Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });
    
   
  }

  async ExistingBrokerLogin(testInfo) {
    await test.step(`Enter broker username-`+testdata.existingbrokerLogin.brokerLoginUsername, async () => {
      await this.brokerLoginUsername.fill(testdata.existingbrokerLogin.brokerLoginUsername);
    });

    await test.step(`Enter broker password-`+testdata.existingbrokerLogin.brokerLoginPassword, async () => {
      await this.brokerLoginPassword.fill(testdata.existingbrokerLogin.brokerLoginPassword);
    });

    await test.step(`Click broker login`, async () => {
      await testInfo.attach('Existing Broker Login Page', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.btnLogin.click();
    });

    await test.step(`Verify Broker login`, async () => {
      await this.page.waitForTimeout(800);
      await expect(this.btnbrokerLoggout).toBeVisible();
      await testInfo.attach('Broker Home Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });
    
   
  }

  async GotoBrokerOnlinePage(web_url, testInfo) {
    await test.step(`Navigate to Online Web Page`, async () => {
      await this.page.goto(web_url);
      await this.page.waitForTimeout(500);
      await testInfo.attach('Broker Login Online Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

  }

  async BrokerHomePage(testInfo) {

    await test.step(`Verify Broker able to view Products page`, async () => {
      await this.brokerproducts.click();
      await this.page.waitForTimeout(800);
      await expect(this.brokerproductsHeadings).toBeVisible();
      await testInfo.attach('Broker Products Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });
   
    await test.step(`Verify Broker able to view Lending Criteria page`, async () => {
      await this.brokerLendingCriteria.click();
      await this.page.waitForTimeout(1800);
      await expect(this.brokerLendingCriteriaHeadings).toBeVisible();
      await testInfo.attach('Broker Lending Criteria Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });

  }

  async MailinatorActivation(testInfo) {

    await test.step(`Open email and activate Account link`, async () => {
      await this.mailiLogin.click();
      await this.mailUsername.fill(testdata.mailinator.username);
      await this.mailPassword.fill(testdata.mailinator.password);
      await testInfo.attach('Malinator Login', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.mailSignin.click();
      await this.page.waitForTimeout(800);
      await this.mailSearchField.fill(testdata.brokerNewRegistrationDetails.emailID);
      await this.page.waitForTimeout(2800);
      await testInfo.attach('Search inbox', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.btnmailSearch.click();
      await this.page.waitForTimeout(1800);
      await testInfo.attach('Click inbox item', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.mailinbox.click();
      await this.page.waitForTimeout(1000);
      await testInfo.attach('Click link and activate', { body: await this.page.screenshot(), contentType: 'image/png' });
      await this.mailactivatelink.click();
      await this.page.waitForTimeout(1000);
      //await expect(this.mailactivated).toBeVisible();
      await testInfo.attach('Broker Lending Criteria Page', { body: await this.page.screenshot(), contentType: 'image/png' });
    });
    

  }

}