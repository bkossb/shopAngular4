import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../models/order';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;

  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService,
              private orderService: OrderService,
              private router: Router) {}

  ngOnInit() {

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }


  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);


  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();

  }

}
