import{test,expect} from '@playwright/test'
import MyExcel from 'xlsx'
import MyJson from 'fs'

test.describe("Test Scenario on Adding one Employee",()=>
    {
        function ReadExcel(filepath:string,sheetname:string)
        {
        const workbook = MyExcel.readFile(filepath);
        const worksheet:any = workbook.Sheets[sheetname];
        return MyExcel.utils.sheet_to_json(worksheet,{header:1});
        
        }

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
                const Jsondata = JSON.parse(MyJson.readFileSync('XpathJson/AllXpaths.json','utf-8'))
                const Elogin :any = ReadExcel('./Empinfo/OrangeHRMData.xlsx','LoginData');

                await page.locator(Jsondata.XUN).fill(Elogin[1][0]);
                await page.waitForTimeout(500);

                await page.locator(Jsondata.XPWD).fill(Elogin[1][1]);
                await page.waitForTimeout(500);

                await page.locator(Jsondata.XSUB).click();
                await page.waitForTimeout(5000);

                await page.locator(Jsondata.XPIM).hover();
                await page.waitForTimeout(3000);

                await page.locator(Jsondata.XADD).click();
                await page.waitForTimeout(2000)

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XID).fill("77880");
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XFIRST).fill("JsonDoe");
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XLAST).fill("Royee");
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XMID).fill("Tom");
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XNICK).fill("Don");
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XPHOTO).setInputFiles("./EmpPhotos/Albert.png")
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XSAVE).click();
                await page.waitForTimeout(3000);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XBACK).click();
                await page.waitForTimeout(5000);


            })
            
    })


