const { By, until } = require("selenium-webdriver");

class PersonaPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "http://localhost:4200";
        this.nombreInput = By.id("nombre");
        this.edadInput = By.id("edad");
        this.emailInput = By.id("email");
        this.submitButton = By.css("button[type='submit']");
        this.cancelButton = By.xpath("//button[contains(text(),'Cancelar')]");
        this.tableRows = By.css("tbody tr");
    }

    async open() {
        await this.driver.get(this.url);
    }

    async fillForm(nombre, edad, email) {
        await this.driver.findElement(this.nombreInput).sendKeys(nombre);
        await this.driver.findElement(this.edadInput).sendKeys(edad);
        await this.driver.findElement(this.emailInput).sendKeys(email);
    }

    async submitForm() {
        await this.driver.findElement(this.submitButton).click();
    }

    async getPersonasCount() {
        let personas = await this.driver.findElements(this.tableRows);
        return personas.length;
    }

    async personaExists(nombre) {
        let personas = await this.driver.findElements(this.tableRows);
        for (let persona of personas) {
            let nombreText = await persona.findElement(By.css("td:first-child")).getText();
            if (nombreText === nombre) {
                return true;
            }
        }
        return false;
    }


    async eliminarPersona(nombre) {
        let personas = await this.driver.findElements(this.tableRows);
        for (let persona of personas) {
            let nombreText = await persona.findElement(By.css("td:first-child")).getText();
            if (nombreText === nombre) {
                let eliminarBtn = await persona.findElement(By.xpath(".//button[contains(text(),'Eliminar')]"));
                await eliminarBtn.click();

                return true;
            }
        }
        return false;
    }



}

module.exports = PersonaPage;