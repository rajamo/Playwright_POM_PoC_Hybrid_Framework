Playwright Demo framework for Page Object Model:
1.Test data management - Json
2.Report - HTML and Allure 
3.Programming - Typescript

Setup Dependency 
npm init –y

npm init playwright@latest

npm install @playwright/test

npm install @types/node      

Other installations:
npm install dotenv --save

allure install 
npm install -D allure-playwright

generate report 
allure generate ./allure-results -o ./allure-report

view report 
allure open ./allure-report
