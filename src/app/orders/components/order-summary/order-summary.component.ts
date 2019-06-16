import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() items: Iterable<Product>;
  @Input() sum: number;
}
