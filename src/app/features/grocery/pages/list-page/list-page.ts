import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ListService } from '../../../../core/services/list';
import { Item } from '../../../../core/models/item.model';
import { ANY_STORE } from '../../../../core/models/store.constants';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrls: ['./list-page.css'],
  standalone: false
})
export class ListPage implements OnInit {

  items: Item[] = [];
  newItem = '';
  selectedStore = ANY_STORE;
  activeStorePickerItemId: string | null = null;

  stores = [
    'Walmart',
    'Target',
    'Costco',
    'Trader Joe\'s',
    'Aldi'
  ];

  constructor(
    private listService: ListService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    const items = this.listService.getItemsForList('default');
    this.items = items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    this.cdr.detectChanges();
  }

  addItem() {
    if (!this.newItem.trim()) return;

    const item: Item = {
      id: crypto.randomUUID(),
      listId: 'default',
      name: this.newItem,
      store: this.selectedStore || undefined,
      inCart: false,
      createdAt: new Date()
    };

    this.listService.addItem(item);
    this.newItem = '';
    this.loadItems();
  }

  toggleItem(id: string) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    this.listService.toggleItem(item);
    this.loadItems();
  }

  deletePurchased() {
    this.listService.deleteInCartItems('default');
    this.loadItems();
  }

  openStorePicker(itemId: string) {
    this.activeStorePickerItemId = itemId;
  }

  setItemStore(itemId: string, store: string) {
    this.activeStorePickerItemId = null;
    this.listService.updateItemStore(itemId, store);
    this.loadItems();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.item-store-trigger') && !target.closest('.item-store-picker')) {
      this.activeStorePickerItemId = null;
    }
  }

}
