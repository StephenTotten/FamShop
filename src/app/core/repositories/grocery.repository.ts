import { Injectable, Inject } from '@angular/core';
import { IStorage, STORAGE_TOKEN } from '../interfaces/storage.interface';
import { Item } from '../models/item.model';
import { List } from '../models/list.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroceryRepository {

  private readonly LIST_KEY = environment.storage.listsKey;
  private readonly ITEM_KEY = environment.storage.itemsKey;

  constructor(@Inject(STORAGE_TOKEN) private storage: IStorage) {}

  getLists(): List[] {
    return this.storage.get<List[]>(this.LIST_KEY) || [];
  }

  saveLists(lists: List[]): void {
    this.storage.set(this.LIST_KEY, lists);
  }

  getItems(): Item[] {
    return this.storage.get<Item[]>(this.ITEM_KEY) || [];
  }

  saveItems(items: Item[]): void {
    this.storage.set(this.ITEM_KEY, items);
  }

}
