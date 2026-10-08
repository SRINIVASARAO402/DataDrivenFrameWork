import{test,expect} from '@playwright/test'
import MyExcel from 'xlsx'
import MyJson from 'fs'
import path from 'path';

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
                
                context = await browser.newContext({});
                
                page = await context.newPage();

                await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php");
            })

            test("Test Case to Add Multiple Employee",async()=>
            {
                test.setTimeout(900000);
                const Jsondata = JSON.parse(MyJson.readFileSync('XpathJson/AllXpaths.json','utf-8'))
                const Elogin :any = ReadExcel('./Empinfo/OrangeHRMData.xlsx','LoginData');
                const Empdetails :any = ReadExcel('./Empinfo/OrangeHRMData.xlsx','EmpDetails');

                await page.locator(Jsondata.XUN).fill(Elogin[1][0]);
                await page.waitForTimeout(500);

                await page.locator(Jsondata.XPWD).fill(Elogin[1][1]);
                await page.waitForTimeout(500);
                await page.locator(Jsondata.XSUB).click();
                await page.waitForTimeout(1000);

                
                await page.screenshot({path : "./MyTestProofs/HomePage.jpg"})

                for(let A =1; A<Empdetails.length; A++)

                {

                await page.waitForTimeout(2000);

                await page.locator(Jsondata.XPIM).hover();
                await page.waitForTimeout(2000);

                await page.locator(Jsondata.XADD).click();
                await page.waitForTimeout(2000)

                //Number Converted to String
                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XID).fill(Empdetails[A][0].toString());//Number Converted to String
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XFIRST).fill(Empdetails[A][1]);
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XLAST).fill(Empdetails[A][2]);
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XMID).fill(Empdetails[A][3]);
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XNICK).fill(Empdetails[A][4]);
                await page.waitForTimeout(500);

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XPHOTO).setInputFiles("./EmpPhotos/"+Empdetails[A][1]+".png")
                await page.waitForTimeout(500);
                
                await page.screenshot({path : "./MyTestProofs/"+Empdetails[A][1]+"_BeforeSave.jpg"})
                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XSAVE).click();
                await page.waitForTimeout(3000);

                await page.screenshot({path : "./MyTestProofs/"+Empdetails[A][1]+"_AfterSave.jpg"})

                await page.frameLocator(Jsondata.XFRAME).locator(Jsondata.XBACK).click();
                await page.screenshot({path : "./MyTestProofs/"+Empdetails[A][1]+"AddedSuccesfully.jpg"})
                await page.waitForTimeout(2000);

                console.log("The Employee with First Names: "+ Empdetails[A][1] ,"Add SuccessFully");
                
             
                }//End of For loop

                await page.waitForTimeout(5000);


            })
            
    })


