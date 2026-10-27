import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';
import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test.describe(`Verify login page`, async () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.load();
    });

    test(`Register new user`, async ({ navigarationComponent, registrationPage, headerComponent, loginPage, accountCreated }) => {
        const registrationData = fakerDataGenerator.generateNewUserData();
        registrationData.firstname = 'Leonid';
        registrationData.lastname = 'Smotrykovskyi';
        registrationData.name = `${registrationData.firstname} ${registrationData.lastname}`;
        await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
        await loginPage.verifyPageURL('/login');
        await loginPage.fillAndSubmitSignupForm({
            name: registrationData.name,
            email: registrationData.email,
        });
        await registrationPage.fillAndSubmitRegistrationForm(registrationData);
        await accountCreated.verifyAccountCreatedMessage();
        await accountCreated.clickOnContinueButton();
        await headerComponent.verifyLoggedInMessage(`Logged in as ${registrationData.firstname} ${registrationData.lastname}`);
        // test cleanup - delete created user
        await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.DeleteAccount);
    });
})