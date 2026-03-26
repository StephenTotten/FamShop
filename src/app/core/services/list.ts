import { Injectable } from '@angular/core';
import { GroceryRepository } from '../repositories/grocery.repository';
import { Item } from '../models/item.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private repo: GroceryRepository) {}

  getLists(): List[] {
    return this.repo.getLists();
  }

  saveList(list: List): void {
    return this.repo.saveLists([list]);
  }

  getItemsForList(listId: string): Item[] {
    return this.repo.getItems();
  }

  addItem(item: Item): void {
    const items = this.repo.getItems();
    this.repo.saveItems([...items, item]);
  }

  toggleItem(item: Item): void {
    const items = this.repo.getItems();
    const found = items.find(i => i.id === item.id);
    if (found) found.inCart = !found.inCart;
    this.repo.saveItems(items);
  }

  deleteInCartItems(listId: string): void {
    const items = this.repo.getItems().filter(i => !i.inCart);
    this.repo.saveItems(items);
  }

  updateItemStore(itemId: string, store: string): void {
    const items = this.repo.getItems();
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    item.store = store;
    this.repo.saveItems(items);
  }

}
