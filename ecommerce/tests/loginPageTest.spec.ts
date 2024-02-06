import { test, expect } from "@playwright/test";
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { assertProductRemoved } from '../tests/utils/assertion';

// Load and parse the YAML file
const envConfig = yaml.load(fs.readFileSync('src/helper/env.yaml', 'utf8'));

test.describe.configure({ mode: "serial" });

let page; // Declare page variable outside beforeEach

test.describe("Login Actions", () => {
    let context;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        // Navigate to the base URL and perform login actions only once
        await page.goto(envConfig.BASE_URL);
        await page.fill('#user-name', envConfig.VALID_USERNAME);
        await page.fill('#password', envConfig.VALID_PASSWORD);
        await page.click('#login-button');
        // await page.waitForNavigation(); // Wait for navigation after login
    });

    test('Adding multiple products to the cart', async () => {
        try {
            // Redirect to the home URL
            await page.goto(envConfig.HOME_URL);
    
            // Define an array of product selectors
            const productSelectors = ['#add-to-cart-sauce-labs-backpack', '#add-to-cart-sauce-labs-bike-light', '#add-to-cart-sauce-labs-bolt-t-shirt'];
    
            // Iterate over each product selector
            for (const selector of productSelectors) {
                // Add product to the cart
                await page.click(selector);

                // Wait for a short timeout for the product to be added 
                await page.waitForTimeout(1000);
            }
    
            console.log("Products added to cart successfully");
    
            // Verify that the product count increases in the cart
            await page.click('.shopping_cart_link');

            // Wait for the cart page to load 
            await page.waitForTimeout(2000);
            
        } catch (error) {
            console.error('Error occurred while adding products to cart:', error);
            throw error; // Rethrow the error to fail the test
        }
    });

    test('Removing products from the cart', async () => {
        try {
            // Click on the shopping cart link
            await page.click('.shopping_cart_link');
    
            // Wait for the cart page to load
            await page.waitForTimeout(4000);
    
            // Select the product to remove
            const removeButtonSelector = '#remove-sauce-labs-backpack';
            
            // Wait for the remove button to be available
            await page.waitForSelector(removeButtonSelector);
            
            // Click on the remove button
            await page.click(removeButtonSelector);

            // Use assertion function from assertions.js
            await assertProductRemoved(page);


            //click on continoue shoping
            const cshop = page.locator('#continue-shopping');
            await cshop.click();
            await page.waitForTimeout(2000);

        } catch (error) {
            console.error('Error occurred while removing products from the cart:', error);
            throw error; // Rethrow the error to fail the test
        }
    });
});


