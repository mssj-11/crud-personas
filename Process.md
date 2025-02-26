```sh
ng new crud-personas --routing --style=scss
cd crud-personas
ng add @angular/forms
```

`npm install @angular/forms`

###  2.- Crear el Componente persona
`ng g c persona`


### 3.- Instalar dependencias de Selenium y Mocha para TEST
```sh
npm i selenium-webdriver assert --save
npm i mocha --save-dev
npm i selenium-webdriver mocha webdriver-manager
```

*   Ajustes en el archivo **`package.json`**:
```js
"test": "mocha ./test/*.spec.js --no-timeouts"
```

*   **Correr TEST**:
```js
npm run test
```