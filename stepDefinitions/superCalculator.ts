import { browser } from "protractor";
import { HomePageObject } from "../pageModules/homePage";
const { Then, Given, When, And } = require("cucumber");

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const homePage: HomePageObject = new HomePageObject();

Given(/^I am on calculator home page$/, async function() {

     await expect(homePage.HomePageHeading.getText()).to.eventually.equal("Super Calculator");
     console.log("Into Feature 1");

   });

When(/^I add numbers "(.*?)" and "(.*?)"$/, async function(text1, text2) {
     // Write code here that turns the phrase above into concrete actions
     await homePage.inputValue1.sendKeys(text1);
     await homePage.inputValue2.sendKeys(text2);
   });

When(/^I click on Go Button$/, async function() {
     // Write code here that turns the phrase above into concrete actions
     await homePage.Go.click();
   });

Then(/^I should see result as "(.*?)"$/, async function(text) {
     // Write code here that turns the phrase above into concrete actions
     await  browser.sleep(4500);
     await expect(homePage.result.getText()).to.eventually.equal(text);
   });
