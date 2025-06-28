import { Injectable, signal } from '@angular/core';
import { Product } from './product-interface';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  selectedProducts = signal<Product[]>([]);

  toggleBtn(product: Product) {

    const currentProducts = this.selectedProducts()

    const selectedBoolean = currentProducts.find(p => p.id === product.id);

    let updated: Product[];

    if (selectedBoolean) {

      updated = currentProducts.filter(p => p.id !== product.id)

    } else {
      updated = [...currentProducts, { ...product, quantity: 1 }]
    }

    this.selectedProducts.set(updated);

  }


  increaseQuantity(id: number) {
    const updated = this.selectedProducts().map(p => {
      if (p.id === id) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });
    this.selectedProducts.set(updated);
  }

  decreaseQuantity(id: number) {
    const updated = this.selectedProducts().flatMap(p => {
      if (p.id === id) {
        return (p.quantity - 1) > 0 ? [{ ...p, quantity: p.quantity - 1 }] : [];
      }
      return [p];
    });
    this.selectedProducts.set(updated);
  }

  // quantity of product
  getQuantity(id: number): number {
    return this.selectedProducts().find(p => p.id === id)?.quantity || 0;
  }

  // quantity of all products in cart
  cartCount(): number {
    return this.selectedProducts().reduce((acc, p) => acc + p.quantity, 0);
  }

  // clearing cart
  clearCart() {
    this.selectedProducts.set([]);
  }

}
