// src/helper/env.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

// Resolve the path to the .env file
const envPath = path.resolve(__dirname, 'env', '.env.saucedemo');

// Load environment variables from the .env file
dotenv.config({ path: envPath });

// Define the ENV class to access environment variables
export default class ENV {
    public static BASE_URL: string = process.env.BASE_URL || "https://www.saucedemo.com/";
    public static VALID_USERNAME: string = process.env.VALID_USERNAME || "visual_user";
    public static VALID_PASSWORD: string = process.env.VALID_PASSWORD || "secret_sauce";
    public static HOME_URL: string = process.env.HOME_URL|| "https://www.saucedemo.com/inventory.html";

}
