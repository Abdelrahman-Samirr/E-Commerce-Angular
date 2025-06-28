import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product-service';
import { CartService } from '../cart-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {

  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);

  product!: Product;

  quantity = signal(1); // for counter

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe((res: Product) => {
        this.product = res;
      });
    }
  }

  increasingProduct() {
    this.quantity.update(q => q + 1);
  }

  decreasingProduct() {
    this.quantity.update(q => q > 1 ? q - 1 : 1);
  }

  addToCart() {
    const currentQty = this.quantity();
    const existingQty = this.cartService.getQuantity(this.product.id);

    if (currentQty !== existingQty) {
      const updatedProducts = this.cartService.selectedProducts().filter(p => p.id !== this.product.id);
      // this.cartService.selectedProducts.set([...updatedProducts,{ ...this.product, quantity: currentQty }

      const newProduct: Product = {
        ...this.product,
        quantity: currentQty,
      };

      this.cartService.selectedProducts.set([...updatedProducts, newProduct]);
      ;
    }
  }

  isOutOfStock(): boolean {
    return this.product.availabilityStatus === 'Low in Stock';
  }
}
