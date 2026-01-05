import { Component, inject, signal } from '@angular/core';
import { CartItemVm } from './view-model/cart-item.vm';
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { SharedModule } from '../../shared.module';
import { ShopStore } from '../../store/shop.store';

@Component({
  selector: 'app-cart',
  imports: [SharedModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  readonly store = inject(ShopStore);
  
}
