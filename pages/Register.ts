import { Page, Locator, expect } from "@playwright/test";
import { URL, NAME, EMAIL, PASS } from "./TestData";

export class Register {
  readonly page: Page;
  readonly titleOfLandingPage: Locator;
  readonly singnUp: Locator;
  readonly newUserText: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly singUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleOfLandingPage = page.getByAltText(
      `Website for automation practice`
    );
    this.singnUp = page
      .getByRole("listitem")
      .filter({ hasText: " Signup / Login" });
    this.newUserText = page.getByText("New User Signup!");
    this.name = page.getByPlaceholder("Name");
    this.email = page.getByPlaceholder("Email Address").nth(1);
    this.singUpButton = page.getByRole("button", { name: "Signup" });
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async singUp() {
    await this.singnUp.click();
    await expect(this.newUserText).toBeVisible();
    await this.name.fill("sumith");
    await this.email.fill("sumith@12gmail.com");
    await this.singUpButton.click();
  }

  // enter account information

  titleOfUser(title: string) {
    //dynamic locators
    return this.page.getByRole("radio", { name: title });
  }

  get password() {
    return this.page.locator("#password");
  }

  selectDate(date: string) {
    return this.page.locator("#days").selectOption(date);
  }

  selectMonth(month: string) {
    return this.page.locator("#months").selectOption(month);
  }

  selectYear(year: string) {
    return this.page.locator("#years").selectOption(year);
  }

  get firstName() {
    return this.page.getByRole("textbox", { name: "First name " });
  }

  get lastName() {
    return this.page.locator("#last_name");
  }

  get address() {
    return this.page.locator("#address1");
  }

  country(country: string) {
    return this.page.locator("#country").selectOption(country);
  }

  get state() {
    return this.page.locator("#state");
  }

  get city() {
    return this.page.locator("#city");
  }

  get zipcode() {
    return this.page.locator("#zipcode");
  }

  get mobileNumber() {
    return this.page.locator("#mobile_number");
  }

  get createAccount() {
    return this.page.getByRole("button", { name: "Create Account" });
  }

  async enterDetails() {
    await this.titleOfUser("Mrs.").click();
    await this.password.fill(PASS);
    await this.selectDate("15");
    await this.selectMonth("September");
    await this.selectYear("1998");
    await this.firstName.fill("sumith");
    await this.lastName.fill("ajhdg");
    await this.address.fill("address_!");
    await this.country("India");
    await this.state.fill("TG");
    await this.city.fill("HYD");
    await this.zipcode.fill("765768");
    await this.mobileNumber.fill("8764343434");
    await this.createAccount.click();
  }
}
