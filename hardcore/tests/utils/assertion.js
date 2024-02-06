// assertions.js

import { expect } from '@playwright/test';

export async function assertProductRemoved(page) {
    // Verify that the product is removed from the cart
    const cartContent = await page.textContent('.cart_list');
    expect(cartContent).not.toContain('Sauce Labs Backpack');
}

module.exports = {
    assertProductRemoved
};
