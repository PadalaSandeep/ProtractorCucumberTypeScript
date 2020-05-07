import { HomePageObject } from "../pageModules/homePage";

const { Then, Given, When, And } = require("cucumber");
const {browser} = require("protractor");
var fs = require('fs');

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const assert = chai.assert;

import testdataJson from "../testData/testdata";

const homePage: HomePageObject = new HomePageObject();

Given(/^I am on dropdown page$/, async function() {
    
    await expect(homePage.HomePageHeading.getText()).to.eventually.equal("Super Calculator");
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, "image/png");
    console.log("Into Feature 2");

  });

Then(/^I should see all operators in dropdown$/, async function(){
    // Write code here that turns the phrase above into concrete actions
    let dropdownActual = new Array("+", "/", "%", "*", "-");
    for (let i = 0; i < (await homePage.dropdown).length; i++) {
      console.log('Inside for loop');
      await expect(homePage.dropdown.get(i).getText()).to.eventually.equal(dropdownActual[i]);
      await homePage.dropdown.get(i).click();
      console.log("value" + i);
    }
    await homePage.dropdownclick.click();
  });


