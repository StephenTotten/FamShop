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

  addList(list: List) {
    const lists = this.repo.getLists();
    lists.push(list);
    this.repo.saveLists(lists);
  }

  getItemsForList(listId: string): Item[] {
    return this.repo.getItems().filter(i => i.listId === listId);
  }

  addItem(item: Item) {
    const items = this.repo.getItems();
    items.push(item);
    this.repo.saveItems(items);
  }

  toggleItem(id: string) {

    const items = this.repo.getItems();

    const item = items.find(i => i.id === id);

    if (item) {
      item.inCart = !item.inCart;
    }

    this.repo.saveItems(items);

  }

  deleteInCartItems(listId: string) {

    const items = this.repo
      .getItems()
      .filter(i => !(i.listId === listId && i.inCart));

    this.repo.saveItems(items);

  }

  updateItemStore(id: string, store: string) {

    const items = this.repo.getItems();
    const item = items.find(i => i.id === id);

    if (!item) {
      return;
    }

    item.store = store;
    this.repo.saveItems(items);

  }

}