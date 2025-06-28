import { Component, computed, inject } from '@angular/core';
import { CartService } from '../cart-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../product-interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartService = inject(CartService);

  products = computed(() => this.cartService.selectedProducts());

  increasingProduct(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decreasingProduct(id: number) {
    const product = this.products().find(p => p.id === id);
    if (product && product.quantity > 1) {
      this.cartService.decreaseQuantity(id);
    }
  }

  getProductQuantity(id: number): number {
    return this.cartService.getQuantity(id);
  }

  removeItem(id: number) {
    const updated = this.products().filter(p => p.id !== id);
    this.cartService.selectedProducts.set(updated);
  }

  getTotalPrice(): number {
    return this.products().reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
