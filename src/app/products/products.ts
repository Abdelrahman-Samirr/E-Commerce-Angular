import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product-service';
import { CartService } from '../cart-service';
import { RouterModule } from '@angular/router';
import { Product } from '../product-interface';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})

export class Products implements OnInit {

  productService = inject(ProductService);

  cartService = inject(CartService);

  // products: any[] = [];
  
  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.products.set(data.products as any[]),
      error: (err) => console.log('Faild to load products: ', err),
    });
  }

  toggleCart(id: number) {
    const product = this.products().find(p => p.id === id);
    if (product) {
      this.cartService.toggleBtn({ ...product, quantity: 1 });
    }
  }
  isInCart(id: number): boolean {
    return this.cartService.selectedProducts().some(p => p.id === id);
  }
}
