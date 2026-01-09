import { ALL_PRODUCTS } from "../data/all-products";
import { CartQuantities } from "../models/cart-quantities.model";
import { Product } from "../models/product.model";

export interface ShopSlice {
    readonly products: Product[];
    readonly searchWord: string;
    readonly cartVisible: boolean;
    readonly cartQuantities: CartQuantities;
}

export type PersistedShopSlice = Pick<ShopSlice, 'cartQuantities'>;

export const initialShopSlice: ShopSlice = {
    products: ALL_PRODUCTS,
    searchWord: '', 
    cartVisible: false, 
    cartQuantities: {
    },     
}