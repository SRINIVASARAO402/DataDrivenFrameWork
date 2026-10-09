import{test,expect} from '@playwright/test'
import MyExcel from 'xlsx'
import MyJson from 'fs'

test.describe("Test Scenario on Adding one Employee",()=>
    {
        let page:any;
        let context;

        test.beforeAll("Lanch my application",async({browser})=>
            {
                context = await browser.newContext();
                page = await context.newPage();

                await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php");
            })

            test("Test Case to Add one Employee",async()=>
            {
                await page.locator("//input[@type='text']").fill("playwright");
                // await page.waitForTimeOut(500);
                await page.locator("//input[@type='password']").fill("playwright");
                await page.waitForTimeout(500);
                await page.locator("//input[@type='Submit']").click();
                await page.waitForTimeout(5000);

            
            })


    })


