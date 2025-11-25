import { expect, test } from '@playwright/test'

test("Register the user", async ({ page }) =>{
    let name = 'sumith';
    let email = 'sumithr@gmail.com'
    let pass = 'pass@1234'


    await page.goto(`https://automationexercise.com/`)
    await expect(page.getByAltText(`Website for automation practice`)).toBeVisible()
    await page.getByRole('listitem').filter({hasText: ' Signup / Login'}).click() // locator chaining
    await expect(page.getByText('New User Signup!')).toBeVisible()

    await page.getByPlaceholder('Name').fill(name)
    await page.getByPlaceholder('Email Address').nth(1).fill(email)

    // await page.locator('form').filter( {hasText : 'Singup'}).getByPlaceholder('Email Address').fill(email)

    await page.getByRole('button', {name : 'Signup'}).click()

    await expect(page.getByText('Enter Account Information')).toBeVisible()

    await page.getByRole('radio', {name : 'Mr.'}).check()

    // await expect(page.locator('#name')).toHaveText(name)
    let nameFromUI = await page.locator('#name').getAttribute('value')
    console.log(`name :: ${nameFromUI}`)
    expect(nameFromUI).toBe(name)

    await page.locator('#password').fill(pass)

    await page.locator('#days').selectOption('15')
    await page.locator('#months').selectOption('September')
    await page.locator('#years').selectOption('1998')

    await page.locator('#newsletter').click()

    await page.getByRole('textbox', {name : 'First name '}).fill('sumith')
    await page.locator('#last_name').fill('Reddy')
    await page.locator('#address1').fill('address1')

    await page.locator('#country').selectOption('India')

    await page.locator('#state').fill('Telangana')
    await page.locator('#city').fill('Hyd')
    await page.locator('#zipcode').fill('6543231')
    await page.locator('#mobile_number').fill('1234567899')
    
    await page.getByRole('button', {name : 'Create Account'}).click()
   
    await expect(page.getByText('Account Created!')).toBeVisible()
    
    await page.locator(`//a[@data-qa="continue-button"]`).click()

    await expect(page.getByRole('listitem').filter({hasText: 'Logged in as'})).toContainText(name)

    await page.getByRole('listitem').filter({hasText: 'Delete Account'}).click()
    
    await expect(page.getByText('Account Deleted!')).toBeVisible()

})
