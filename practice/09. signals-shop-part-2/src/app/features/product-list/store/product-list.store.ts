import { signalStore, withComputed, withState, withProps, withMethods } from "@ngrx/signals";
import { initialProductListSlice } from "./product-list.slice";
import { buildProductListVm } from './product-list.vm-builder';
import { computed, inject } from "@angular/core";
import { ShopStore } from "../../../store/shop.store";

export const ProductListStore = signalStore(
    withState(initialProductListSlice), 
    withProps( store => ({
        _shopStore: inject(ShopStore)
    })),
    withComputed(store => ({
        productListVm: computed(() => buildProductListVm(
            store._shopStore.products(), 
            store._shopStore.searchWord(), 
            store._shopStore.cartQuantities()
        )), 
    })),
    withMethods(store => ({
        viewCart: store._shopStore.viewCart,
        addToCart: store._shopStore.addToCart
    }))
)