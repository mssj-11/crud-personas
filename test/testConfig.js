// Para abrir ventanas de navegador
/*
const { Builder } = require("selenium-webdriver");

async function getDriver() {
    let driver = await new Builder().forBrowser("firefox").build();
    return driver;
}

module.exports = { getDriver };*/
// Modo headless (sin interfaz gráfica):
const { Builder } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

async function getDriver() {
    let options = new firefox.Options();
    options.addArguments("--headless");  // Ejecutar sin interfaz gráfica
    options.addArguments("--disable-gpu"); // Evita problemas en algunos entornos
    options.addArguments("--no-sandbox"); // Requerido en Docker
    options.addArguments("--disable-dev-shm-usage"); // Evita problemas de memoria compartida

    let driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(options)
        .build();

    return driver;
}

module.exports = { getDriver };