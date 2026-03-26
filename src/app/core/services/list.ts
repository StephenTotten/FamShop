import { Injectable } from '@angular/core';
import { SupabaseRepository } from '../repositories/supabase.repository';
import { Item } from '../models/item.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private repo: SupabaseRepository) {}

  getLists(): Promise<List[]> {
    return this.repo.getLists();
  }

  getItemsForList(listId: string): Promise<Item[]> {
    return this.repo.getItems(listId);
  }

  addItem(item: Item): Promise<void> {
    return this.repo.saveItem(item);
  }

  async toggleItem(item: Item): Promise<void> {
    item.inCart = !item.inCart;
    return this.repo.updateItem(item);
  }

  deleteInCartItems(listId: string): Promise<void> {
    return this.repo.deleteInCartItems(listId);
  }

  async updateItemStore(itemId: string, store: string): Promise<void> {
    return this.repo.updateItemStore(itemId, store);
  }

}
