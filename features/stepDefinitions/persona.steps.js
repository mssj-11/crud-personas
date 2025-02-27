const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { getDriver } = require('../../test/testConfig');
const PersonaPage = require('../../test/pages/personaPage');
const { By, until } = require('selenium-webdriver');

let driver;
let personaPage;
let initialCount;

Given('el usuario está en la página de personas', async function () {
    driver = await getDriver();
    personaPage = new PersonaPage(driver);
    await personaPage.open();

    // Esperar hasta que el input de nombre esté presente en la página
    //await driver.wait(until.elementLocated(personaPage.nombreInput), 10000);
});

When('llena el formulario con {string}, {int}, {string}', async function (nombre, edad, email) {
    initialCount = await personaPage.getPersonasCount();
    await personaPage.fillForm(nombre, edad, email);
    this.nombre = nombre;
});

When('envía el formulario', async function () {
    await personaPage.submitForm();
    //await driver.wait(until.elementLocated(By.xpath(`//td[contains(text(), '${this.nombre}')]`)), 10000);
    
});

Then('la persona {string} debe aparecer en la lista', async function (nombre) {
    let exists = await personaPage.personaExists(nombre);
    expect(exists).to.be.true;
    //await driver.quit();
});

Then('la cantidad de personas no debe aumentar', async function () {
    /*
    let countAfter = await personaPage.getPersonasCount();
    expect(countAfter).to.equal(initialCount);
    await driver.quit();*/
    if (!driver) {
        driver = await getDriver();
        personaPage = new PersonaPage(driver);
    }
    let countAfter = await personaPage.getPersonasCount();
    expect(countAfter).to.equal(initialCount);
});

Given('el usuario ha agregado {string} con edad {int} y email {string}', async function (nombre, edad, email) {
    /*
    await personaPage.fillForm(nombre, edad, email);
    await personaPage.submitForm();
    let exists = await personaPage.personaExists(nombre);
    expect(exists).to.be.true;*/
    //await driver.quit();
    driver = await getDriver(); // Asegurar que el driver esté activo
    personaPage = new PersonaPage(driver);
    
    await personaPage.open();
    await driver.wait(until.elementLocated(By.css('table')), 10000); // Espera que la tabla de personas esté visible

    await personaPage.fillForm(nombre, edad, email);
    await personaPage.submitForm();
    
    await driver.wait(until.elementLocated(By.xpath(`//td[contains(text(), '${nombre}')]`)), 15000); // Espera que el nombre aparezca
    
    let exists = await personaPage.personaExists(nombre);
    expect(exists).to.be.true;
});

When('elimina a {string}', async function (nombre) {
    await personaPage.eliminarPersona(nombre);
});

Then('la persona {string} no debe aparecer en la lista', async function (nombre) {
    /*
    let exists = await personaPage.personaExists(nombre);
    expect(exists).to.be.false;*/
    await driver.wait(async () => {
        return !(await personaPage.personaExists(nombre));
    }, 10000);
});

After(async function () {
    if (driver) {
        try {
            await driver.quit();
        } catch (error) {
            console.warn("El WebDriver ya ha sido cerrado.");
        }
    }
});

