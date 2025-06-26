import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../cart-service';
import { ProductService } from '../product-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {

  productService = inject(ProductService);

  cartService = inject(CartService);

  products = signal<any[]>([]);

  ngOnInit() {
  this.productService.getProducts().subscribe({
    next: (data: any) => {
      const allProducts = data.products;
      const cartIds = this.cartService.selectedProducts();
      const filteredProduct = allProducts.filter((p: any) => cartIds.includes(p.id));
      this.products.set(filteredProduct);
    },
    error: (err) => console.log('Failed to load products:', err),
  });
}

increasingProduct(id: number) {
  this.cartService.addProduct(id);
  this.ngOnInit(); 
}

decreasingProduct(id: number) {
  this.cartService.removeProduct(id);
  this.ngOnInit(); 
}

getProductQuantity(id: number): number {
  return this.cartService.selectedProducts().filter(p => p === id).length;
}

removeItem(id: number) {
  const updated = this.cartService.selectedProducts().filter(p => p !== id);
  this.cartService.selectedProducts.set(updated);
  this.ngOnInit(); // refresh
}

  
}
