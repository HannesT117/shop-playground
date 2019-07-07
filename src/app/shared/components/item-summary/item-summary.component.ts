import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.scss']
})
export class ItemSummaryComponent {
  @Input() items: Iterable<Product>;
  @Input() sum?: string;
  @Input() isQuantityModifyable = false;
  @Output() quantityChange = new EventEmitter();

  changeAmount(item, amount) {
    this.quantityChange.emit({ item, amount });
  }
}
