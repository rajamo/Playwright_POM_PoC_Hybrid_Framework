import { test, expect } from '../utils/FixtureFile';
import 'dotenv/config';


test('TC_01_New Broker Registration and Activation and Login validation', async ({ page, brokerregistrationpage }, testInfo) => {
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.UAT_BROKER_URL, testInfo);
  await brokerregistrationpage.NewBrokerRegistration(testInfo);
  await brokerregistrationpage.BrokerRegistrationOrgnisationDetails(testInfo);
  await brokerregistrationpage.BrokerRegistrationConfirmation(testInfo);
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.MAILINATOR_URL, testInfo);
  await brokerregistrationpage.MailinatorActivation(testInfo);
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.UAT_BROKER_URL, testInfo);
  await brokerregistrationpage.NewBrokerLogin(testInfo);
  await brokerregistrationpage.BrokerHomePage(testInfo);
});


test('TC_02_Broker Login Failure', async ({ page, brokerregistrationpage }, testInfo) => {
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.UAT_BROKER_URL, testInfo);
  await brokerregistrationpage.ExistingBrokerLogin(testInfo);
  await brokerregistrationpage.BrokerHomePage(testInfo);
}); 

test('TC_03_Admin Searching and modifying customer details', async ({ page, adminamendcustomerdetailspage }, testInfo) => {
  await adminamendcustomerdetailspage.GotoWebURL(process.env.UAT_ADMIN_URL, testInfo);
  await adminamendcustomerdetailspage.AdminLogin(testInfo);
  await adminamendcustomerdetailspage.CustomerSearch(testInfo);
});

/*test('TC_04_Mobile Emulation Broker Login', async ({ page, brokerregistrationpage }, testInfo) => {
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.UAT_BROKER_URL, testInfo);
}); 


test('TC_01_Existing Broker Login', async ({ page, brokerregistrationpage },testInfo) => {

 logindetails.forEach(async (logindetail)=>{
  await brokerregistrationpage.GotoBrokerOnlinePage(process.env.UAT_BROKER_URL,testInfo);
  await brokerregistrationpage.ExistingBrokerLogin(testInfo);
  await brokerregistrationpage.BrokerHomePage(testInfo);

  })

});*/


