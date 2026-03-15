import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../core/services/list';
import { Item } from '../../../../core/models/item.model';
import { ANY_STORE, normalizeStoreValue } from '../../../../core/models/store.constants';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrls: ['./list-page.css'],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  },
  standalone: false
})
export class ListPage implements OnInit {

  items: Item[] = [];
  newItem = '';
  readonly anyStoreLabel = ANY_STORE;
  selectedStore = ANY_STORE;
  activeStorePickerItemId: string | null = null;
  
  stores = [
    'Aldi',
    'Central Market',
    'Costco',
    'Target',
    'Trader Joe\'s',
    'Walmart',
    'Whole Foods',
  ];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.items = this.listService.getItemsForList('default');
  }

  addItem() {

    if (!this.newItem.trim()) return;

    const item: Item = {
      id: crypto.randomUUID(),
      listId: 'default',
      name: this.newItem,
      store: normalizeStoreValue(this.selectedStore),
      inCart: false,
      createdAt: new Date()
    };

    this.listService.addItem(item);

    this.newItem = '';

    this.loadItems();
  }

  toggleItem(id: string) {
    this.listService.toggleItem(id);
    this.loadItems();
  }

  deletePurchased() {
    this.listService.deleteInCartItems('default');
    this.loadItems();
  }

  toggleStorePicker(itemId: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.activeStorePickerItemId = this.activeStorePickerItemId === itemId
      ? null
      : itemId;
  }

  setItemStore(itemId: string, storeValue: string) {
    this.listService.updateItemStore(itemId, normalizeStoreValue(storeValue));
    this.activeStorePickerItemId = null;
    this.loadItems();
  }

  isStorePickerOpen(itemId: string): boolean {
    return this.activeStorePickerItemId === itemId;
  }

  onDocumentClick(event: Event) {
    const target = event.target;

    if (target instanceof Element && target.closest('.item-store-controls')) {
      return;
    }

    this.activeStorePickerItemId = null;
  }

}