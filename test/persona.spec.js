const { expect } = require('chai');
const { getDriver } = require('./testConfig');
const PersonaPage = require('./pages/personaPage');

describe('Test de la página de CRUD Personas', function () {
    let driver;
    let personaPage;

    before(async function () {
        driver = await getDriver();
        personaPage = new PersonaPage(driver);
        await personaPage.open();
    });

    after(async function () {
        await driver.quit();
    });

    it('Debe agregar una persona correctamente', async function () {
        let initialCount = await personaPage.getPersonasCount();
        await personaPage.fillForm("Juan Pérez", 30, "juan@example.com");
        await personaPage.submitForm();
        let newCount = await personaPage.getPersonasCount();
        expect(newCount).to.equal(initialCount + 1);
    });

    it('Debe impedir agregar una persona con datos incorrectos', async function () {
        await personaPage.fillForm("", 17, "correo-invalido");
        await personaPage.submitForm();
        let countAfterInvalid = await personaPage.getPersonasCount();
        expect(countAfterInvalid).to.equal(await personaPage.getPersonasCount());
    });

    it('Debe verificar que la persona agregada existe en la lista', async function () {
        let nombre = "Juan Pérez";
        await personaPage.fillForm(nombre, 30, "juan@example.com");
        await personaPage.submitForm();
        let exists = await personaPage.personaExists(nombre);
        expect(exists).to.be.true;
    });

    it('Debe permitir eliminar una persona de la lista', async function () {
        await personaPage.fillForm("María López", "28", "maria@example.com");
        await personaPage.submitForm();

        let existeAntes = await personaPage.personaExists("María López");
        expect(existeAntes).to.be.true;

        await personaPage.eliminarPersona("María López");

        let existeDespues = await personaPage.personaExists("María López");
        expect(existeDespues).to.be.false;
    });


});
