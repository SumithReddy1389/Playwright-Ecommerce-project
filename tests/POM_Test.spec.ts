import { expect, test } from "@playwright/test";
import { URL, NAME, EMAIL, PASS } from "../pages/TestData";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

test.describe.serial("e-commerce", () => {

  let registerPage : Register
  let loginPage : Login

  //hooks
  test.beforeEach(async ({ page }) =>{
    registerPage = new Register(page)
    loginPage = new Login(page)
    await registerPage.navigate(URL);
  })

  test("Register the user", async ({ page }) => {

    await registerPage.navigate(URL);
    await registerPage.singUp();

    // await registerPage.enterDetails()

    await registerPage.titleOfUser("Mrs.").click();
    await registerPage.password.fill(PASS);
    await registerPage.selectDate("15");
    await registerPage.selectMonth("September");
    await registerPage.selectYear("1998");
    await registerPage.firstName.fill(NAME);
    await registerPage.lastName.fill("ajhdg");
    await registerPage.address.fill("address_!");
    await registerPage.country("India");
    await registerPage.state.fill("TG");
    await registerPage.city.fill("HYD");
    await registerPage.zipcode.fill("765768");
    await registerPage.mobileNumber.fill("8764343434");
    await registerPage.createAccount.click();
  });

  test("login", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.login.click();
    await loginPage.enterEmail.fill(EMAIL);
    await loginPage.enterPass.fill(PASS);
    await loginPage.submit.click();
  });
});
