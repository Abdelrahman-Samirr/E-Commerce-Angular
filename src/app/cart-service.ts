import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedProducts = signal<number[]>([])

  toggleBtn(productId: number) {

    const products = this.selectedProducts()

    const selectedBoolean = products.includes(productId)

    let updated: number[];

    if (selectedBoolean) {

      updated = products.filter(ID => ID !== productId)

    } else {
      updated = [...products, productId]
    }

    this.selectedProducts.set(updated);

  }

  ProductCountArr = signal<number[]>([])

  addProduct(id: number) {
    console.log("increase")

    const productArr = this.ProductCountArr()

    let updated: number[];

    updated = [...productArr, id]

    this.ProductCountArr.set(updated)
  }

  removeProduct(id: number) {
    console.log("decrease")

    const productArr = this.ProductCountArr()

    let updated: number[];

    if (productArr.length) {

      updated = [...productArr]

      updated.splice(updated.length -1 ,1)

      this.ProductCountArr.set(updated)
    }

  }

  productCount(): number {
    return this.ProductCountArr().length
  }

  cartCount(): number {
    return this.selectedProducts().length;
  }


  addQuantityProduct(id: number, quantity: number){

    const current = this.selectedProducts()
    let updated = [...current]

    for (let i = 0; i < quantity; i++) {
    updated.push(id);
  }

  this.selectedProducts.set(updated);
  }

}
