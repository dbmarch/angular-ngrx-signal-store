import { CartQuantities } from "../models/cart-quantities.model";
import { ShopVm } from "./shop.vm";

export function buildShopVm(
    cartVisible: boolean,
    cartQuantities: CartQuantities
): ShopVm {
    const itemsFound = Object.entries(cartQuantities).length;

    return {
        isCartActive: itemsFound > 0,
        isCartVisible: cartVisible,
        cartItemsCount: itemsFound
    }       
}