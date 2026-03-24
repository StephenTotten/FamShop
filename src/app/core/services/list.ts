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

  saveList(list: List): Promise<void> {
    return this.repo.saveList(list);
  }

  getItemsForList(listId: string): Promise<Item[]> {
    return this.repo.getItems(listId);
  }

  async addItem(item: Item): Promise<void> {
    return this.repo.saveItem(item);
  }

  async toggleItem(item: Item): Promise<void> {
    item.inCart = !item.inCart;
    return this.repo.updateItem(item);
  }

  deleteInCartItems(listId: string): Promise<void> {
    return this.repo.deleteInCartItems(listId);
  }

}
