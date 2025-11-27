import { expect, test } from "@playwright/test";

test.describe.serial("e-commerce", () => {
  let name = "sumith";
  let email = "sumithy@gmail.com";
  let pass = "pass@1234";

  test("Register the user", async ({ page }) => {
    await page.goto(`https://automationexercise.com/`);
    await expect(
      page.getByAltText(`Website for automation practice`)
    ).toBeVisible();
    await page
      .getByRole("listitem")
      .filter({ hasText: " Signup / Login" })
      .click(); // locator chaining
    await expect(page.getByText("New User Signup!")).toBeVisible();

    await page.getByPlaceholder("Name").fill(name);
    await page.getByPlaceholder("Email Address").nth(1).fill(email);

    // await page.locator('form').filter( {hasText : 'Singup'}).getByPlaceholder('Email Address').fill(email)

    await page.getByRole("button", { name: "Signup" }).click();

    await expect(page.getByText("Enter Account Information")).toBeVisible();

    await page.getByRole("radio", { name: "Mr." }).check();

    // await expect(page.locator('#name')).toHaveText(name)
    let nameFromUI = await page.locator("#name").getAttribute("value");
    console.log(`name :: ${nameFromUI}`);
    expect(nameFromUI).toBe(name);

    await page.locator("#password").fill(pass);

    await page.locator("#days").selectOption("15");
    await page.locator("#months").selectOption("September");
    await page.locator("#years").selectOption("1998");

    await page.locator("#newsletter").click();

    await page.getByRole("textbox", { name: "First name " }).fill("sumith");
    await page.locator("#last_name").fill("Reddy");
    await page.locator("#address1").fill("address1");

    await page.locator("#country").selectOption("India");

    await page.locator("#state").fill("Telangana");
    await page.locator("#city").fill("Hyd");
    await page.locator("#zipcode").fill("6543231");
    await page.locator("#mobile_number").fill("1234567899");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Account Created!")).toBeVisible();

    await page.locator(`//a[@data-qa="continue-button"]`).click();

    await expect(
      page.getByRole("listitem").filter({ hasText: "Logged in as" })
    ).toContainText(name);

    // await page.getByRole('listitem').filter({hasText: 'Delete Account'}).click()

    // await expect(page.getByText('Account Deleted!')).toBeVisible()
  });

  test("Login with correct usename and password", async ({ page }) => {
    await page.goto(`https://automationexercise.com/`);
    await page
      .getByRole("listitem")
      .filter({ hasText: " Signup / Login" })
      .click();

    await page.locator(`[data-qa="login-email"]`).fill(email);
    await page.getByPlaceholder("Password").fill(pass);

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("listitem").filter({ hasText: "Logged in as" })
    ).toContainText(name);
  });

  test("Add some items to cart", async({ page }) => {
    await page.goto(`https://automationexercise.com/`);
    await page
      .getByRole("listitem")
      .filter({ hasText: " Signup / Login" })
      .click();

    await page.locator(`[data-qa="login-email"]`).fill(email);
    await page.getByPlaceholder("Password").fill(pass);

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("listitem").filter({ hasText: "Logged in as" })
    ).toContainText(name);


     await page
      .getByRole("listitem")
      .filter({ hasText: " Products" })
      .click();

    await expect(page.getByText('All Products')).toBeVisible()

    await page.locator(`[data-product-id="1"]`).first().hover()

    await page.locator(`[data-product-id="1"]`).getByText('Add to cart').first().click()

    
    await expect(page.getByText('Added!')).toBeVisible()
    await expect(page.getByText('Your product has been added to cart.')).toBeVisible()

    await expect(page.getByText(`View Cart`)).toBeVisible()

    await page.getByRole('button', { name : 'Continue Shopping' } ).click()
    
  })

test("Place an order from cart", async({ page }) => {
    await page.goto(`https://automationexercise.com/`);
    await page
      .getByRole("listitem")
      .filter({ hasText: " Signup / Login" })
      .click();

    await page.locator(`[data-qa="login-email"]`).fill(email);
    await page.getByPlaceholder("Password").fill(pass);

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("listitem").filter({ hasText: "Logged in as" })
    ).toContainText(name);


     await page
      .getByRole("listitem")
      .filter({ hasText: " Cart" })
      .click();

    await expect(page.getByText('Shopping Cart')).toBeVisible()
    await expect(page.getByText('Proceed To Checkout')).toBeVisible()
    await expect(page.getByText('Proceed To Checkout')).toBeEnabled()
    
    let price  = (await page.locator('.cart_price').textContent())?.trim().split (" ")[1]
    // Rs. 500 SUMITH 
    // [Rs.  500 SUMITH]
    console.log(price)

    let quantiy = (await page.locator('.cart_quantity').textContent())?.trim()
    console.log(quantiy)

    let total_price = (await page.locator('.cart_total_price').textContent())?.trim().split (" ")[1]
    console.log(total_price)

    let amount = Number(price)* Number(quantiy);

    console.log(amount)

    expect(amount).toEqual(Number(total_price))



})

});
