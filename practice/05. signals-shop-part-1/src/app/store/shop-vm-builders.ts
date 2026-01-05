import { Product } from "../models/product.model"
import { ProductListVm } from "./shop.vm"; 
import { CartItemVm } from "../components/cart/view-model/cart-item.vm";

export function buildProductListVm (
   products: Product[],
   searchWord: String,
   quantities:  Record<string, number>
): ProductListVm {

   return { 
      productItems: buildProductItems()
   }

   function buildProductItems() {
      const word = searchWord
         .trim()
         .toLowerCase();

      // if (!word) return [];
      return products   
         .filter(product => product.name.toLowerCase().includes(word))
         .map(product => ({
            ...product,
            quantity: quantities[product.id] || 0
         }));
   }
}


export function buildCartVm(
   products: Product[],
   quantities: Record<string, number>,
   taxRate: number,
   cartVisible: boolean
){
   const items = buildCartItems();
   const subtotal = items.reduce ((sum,item) => sum + item.total, 0);
   const tax = subtotal * taxRate;
   const total = subtotal + tax;
   const itemsCount = items.length;
   const isActive = itemsCount > 0;
   const isVisible = cartVisible;
   const canCheckout = isActive;

   return {
      items,
      subtotal,
      tax,
      total,
      itemsCount,
      isActive,
      isVisible,
      canCheckout
   };

   function buildCartItems(): CartItemVm[] {
      return products
         .filter(product => quantities[product.id])
         .map(product => {
            const quantity = quantities[product.id];
            return {
               id: product.id,
               name: product.name,
               price: product.unitPrice,
               quantity,
               total: product.unitPrice * quantity
            }

         })
   }


}