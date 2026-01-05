import {withState, withComputed, withMethods, signalStore, patchState, withHooks} from '@ngrx/signals';
import { initialShopSlice, PersistedShopSlice } from './shop.slice';
import { computed, effect, Signal} from '@angular/core';
import { buildProductListVm, buildCartVm } from './shop-vm-builders';
import * as updaters from './shop.updaters';

// Core state are the things that change externally to the application. ( Server & user)
// search string
// whats in the cart - quantities
// inventory

export const ShopStore  = signalStore(
   {providedIn: 'root'},
   withState(initialShopSlice),
   withComputed(store => ({
      productListVm: computed(() => buildProductListVm(
         store.products(),
         store.searchWord(),
         store.cartQuantities()
      )),
      cartVm: computed(() => buildCartVm(
         store.products(),
         store.cartQuantities(),
         store.taxRate(),
         store.cartVisible()
      ))
   })),
   withMethods(store => ({
      setSearchWord: (searchWord: string) => 
         patchState(store, updaters.setSearchWord(searchWord)),
      addToCart: (productId: string) =>
         patchState(store, updaters.addToCart(productId)),
      viewCart: () => 
         patchState(store, updaters.viewCart()),
      hideCart: () => 
         patchState(store, updaters.hideCart()),
      incrementQuantity: (productId: string) => 
         patchState(store, updaters.incrementQuantity(productId)),
      decrementQuantity: (productId: string) => 
         patchState(store, updaters.decrementQuantity(productId)),
      checkoutCart: () => 
         patchState(store, updaters.checkout())
   })),
   withHooks( store => ({
      onInit() {
         const persisted: Signal<PersistedShopSlice> = computed(() => ({
            cartQuantities: store.cartQuantities()
         }))

         const persistedText = localStorage.getItem('shop');
         if (persistedText) {
            const persistedData = JSON.parse(persistedText) as PersistedShopSlice;
            patchState(store, persistedData);
         }

         effect(() => {
            const persistedValue = persisted();
            localStorage.setItem('shop', JSON.stringify(persistedValue))
         })
      }
   }))
);
