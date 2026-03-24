import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../core/services/list';
import { Item } from '../../../../core/models/item.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrls: ['./list-page.css'],
  standalone: false
})
export class ListPage implements OnInit {

  items: Item[] = [];
  newItem = '';
  selectedStore = '';

  stores = [
    'Walmart',
    'Target',
    'Kroger',
    'Costco',
    'Whole Foods',
    'Trader Joe\'s',
    'Aldi',
    'Safeway'
  ];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    this.items = await this.listService.getItemsForList('default');
  }

  async addItem() {
    if (!this.newItem.trim()) return;

    const item: Item = {
      id: crypto.randomUUID(),
      listId: 'default',
      name: this.newItem,
      store: this.selectedStore || undefined,
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

}
