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

}