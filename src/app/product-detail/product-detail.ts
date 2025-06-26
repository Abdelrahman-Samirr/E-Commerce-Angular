import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product-service';
import { CartService } from '../cart-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {

  route = inject(ActivatedRoute);

  productService = inject(ProductService);

  cartService = inject(CartService);

  products = signal<any[]>([]);

  product = signal<any>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe({
      next: (data: any) => {

        const productList = data.products as any[];

        this.products.set(productList);

        const selectedProduct = productList.find(p => p.id === id);

        this.product.set(selectedProduct);
      },
      error: (err) => console.log('Failed to load products: ', err),
    });
  }


  increasingProduct(id: number) {
    this.cartService.addProduct(id)
  }

  decreasingProduct(id: number) {
    this.cartService.removeProduct(id)
  }

  addToCart(id: number) {
    
    const quantity = this.cartService.productCount();

    this.cartService.addQuantityProduct(id, quantity);
  }
}
