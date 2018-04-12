import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  order$;

  constructor(private authService: AuthService,
              private orderService: OrderService) {

    this.order$ = authService.user$.switchMap(u => orderService.getOrderByUser(u.uid));

  }
}
