import * as path from "path";
import { browser, Config } from "protractor";
const rimraf = require("rimraf");
import { Reporter } from "../support/reporter";
const jsonReports = process.cwd() + "/reports/json";
const reportZip = process.cwd() + "/reports/";
const ScreenshotsPath = process.cwd() + "/reports/Screenshots/";
const zipper = require('zip-local');
const empty = require('empty-folder');

export const config: Config = {
    directConnect: true,

    //seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://juliemr.github.io/protractor-demo/",

    capabilities: {
        browserName: "chrome"
        //shardTestFiles: true,
        //maxInstances: 2
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../featureFiles/*.feature",
    ],

    onPrepare: () => {
        rimraf("../reports/json", async () => { console.log("done"); });
        empty(ScreenshotsPath, false, (o)=>{if(o.error) console.error(o.error);});
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../../executionScripts/stepDefinitions/*.js", "../../executionScripts/support/*.js"],
        priorities: {
            '1': ['@Feature1'],
            '2': ['@Feature2']
        },
        strict: true,
        tags: "",
    },

    onComplete: () => {
        Reporter.createHTMLReport();
        zipper.sync.zip(reportZip).compress().save("pack.zip");
    },
};
