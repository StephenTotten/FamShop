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

  readonly ANY_STORE = ANY_STORE;
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

  async ngOnInit(): Promise<void> {
    await this.loadItems();
  }

  async loadItems() {
    const items = await this.listService.getItemsForList('default');
    this.items = items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    this.cdr.detectChanges();
  }

  async addItem() {
    if (!this.newItem.trim()) return;

    const item: Item = {
      id: crypto.randomUUID(),
      listId: 'default',
      name: this.newItem,
      store: this.selectedStore === ANY_STORE ? undefined : this.selectedStore,
      inCart: false,
      createdAt: new Date()
    };

    await this.listService.addItem(item);
    this.newItem = '';
    await this.loadItems();
  }

  async toggleItem(id: string) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    await this.listService.toggleItem(item);
    await this.loadItems();
  }

  async deletePurchased() {
    await this.listService.deleteInCartItems('default');
    await this.loadItems();
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
