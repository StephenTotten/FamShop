import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private LIST_KEY = 'famshop_lists';
  private ITEM_KEY = 'famshop_items';

  constructor(private storage: StorageService) {}

  getLists(): List[] {
    return this.storage.get<List[]>(this.LIST_KEY) || [];
  }

  addList(list: List) {
    const lists = this.getLists();
    lists.push(list);
    this.storage.set(this.LIST_KEY, lists);
  }

  getItems(): Item[] {
    return this.storage.get<Item[]>(this.ITEM_KEY) || [];
  }

  getItemsForList(listId: string): Item[] {
    return this.getItems().filter(i => i.listId === listId);
  }

  addItem(item: Item) {
    const items = this.getItems();
    items.push(item);
    this.storage.set(this.ITEM_KEY, items);
  }

  toggleItem(id: string) {
    const items = this.getItems();

    const item = items.find(i => i.id === id);
    if (item) {
      item.inCart = !item.inCart;
    }

    this.storage.set(this.ITEM_KEY, items);
  }

  deleteInCartItems(listId: string) {
    const items = this.getItems()
      .filter(i => !(i.listId === listId && i.inCart));

    this.storage.set(this.ITEM_KEY, items);
  }

}