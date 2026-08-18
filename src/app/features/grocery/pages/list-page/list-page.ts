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
  dragSrcIndex: number | null = null;
  dragOverIndex: number | null = null;

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
    this.items = items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
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
      createdAt: new Date(),
      sortOrder: this.items.length
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

  onDragStart(index: number) {
    this.dragSrcIndex = index;
  }

  onDragOver(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    if (this.dragSrcIndex === null || this.dragSrcIndex === targetIndex || this.dragOverIndex === targetIndex) return;

    this.dragOverIndex = targetIndex;
    const reordered = [...this.items];
    const [moved] = reordered.splice(this.dragSrcIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    this.dragSrcIndex = targetIndex;
    this.items = reordered;
    this.cdr.detectChanges();
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOverIndex = null;
    this.dragSrcIndex = null;
    const updates = this.items.map((item, i) => ({ id: item.id, sortOrder: i }));
    await this.listService.updateItemOrders(updates);
  }

  onDragEnd() {
    this.dragSrcIndex = null;
    this.dragOverIndex = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.item-store-trigger') && !target.closest('.item-store-picker')) {
      this.activeStorePickerItemId = null;
    }
  }

}