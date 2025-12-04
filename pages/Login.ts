import { Page } from "@playwright/test";

export class Login {
    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    get login(){
         return this.page.getByRole("listitem").filter({ hasText: " Signup / Login" })
    }
    get enterEmail(){
        return this.page.locator(`[data-qa="login-email"]`)
    }

    get enterPass(){
        return this.page.getByPlaceholder("Password")
    }

    get submit(){
        return this.page.getByRole("button", { name: "Login" })
    }
}