import { YooCheckout } from '@a2seven/yoo-checkout';

export const checkout = new YooCheckout({ shopId: process.env.YOOMONEY_SHOP_ID, secretKey: process.env.YOOMONEY_SECRET });