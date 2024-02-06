import { FullConfig } from "@playwright/test";

import dotenv from "dotenv"


async function globalsetup(config: FullConfig) {

    if (process.env.test_env) {
        dotenv.config({
            path: `src/helper/env/env.ts${process.env.test_env}`,
            override: true
        })

    }



}
export default globalsetup;