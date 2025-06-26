import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product-service';
import { CartService } from '../cart-service';
import { RouterModule } from '@angular/router';

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
  products = signal<any[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.products.set(data.products as any[]),
      error: (err) => console.log('Faild to load products: ', err),
    });
  }

  toggleCart(id: number){
    this.cartService.toggleBtn(id)
  }
}
