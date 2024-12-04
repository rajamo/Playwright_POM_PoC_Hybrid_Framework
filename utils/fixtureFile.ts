import { test as baseTest } from "@playwright/test";
import BrokerRegistrationPage from "../pages/BrokerRegistrationPage";
import AdminAmendCustomerDetailsPage from "../pages/AdminAmendCustomerDetailsPage";


type TestPages = {
    brokerregistrationpage: BrokerRegistrationPage;
    adminamendcustomerdetailspage: AdminAmendCustomerDetailsPage;
};

const testpages = baseTest.extend<TestPages>({
    brokerregistrationpage: async ({ page }, info) => { await info(new BrokerRegistrationPage(page)); },
    adminamendcustomerdetailspage:async({page},info) => {await info(new AdminAmendCustomerDetailsPage(page))},
});

export const test = testpages;
export const expect = test.expect;
export const describe = test.describe;
