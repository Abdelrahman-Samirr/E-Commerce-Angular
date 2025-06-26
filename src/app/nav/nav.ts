import { Component, inject } from '@angular/core';
import { CartService } from '../cart-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  cartService = inject(CartService);
}
