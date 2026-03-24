import { Injectable } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { Item } from '../models/item.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRepository {

  private client;

  constructor(private supabase: SupabaseService) {
    this.client = supabase.client;
  }

  async getLists(): Promise<List[]> {
    const { data, error } = await this.client.from('lists').select('*');
    if (error) throw error;
    return data ?? [];
  }

  async saveList(list: List): Promise<void> {
    const { error } = await this.client.from('lists').upsert(list);
    if (error) throw error;
  }

  async getItems(listId: string): Promise<Item[]> {
    const { data, error } = await this.client
      .from('items')
      .select('*')
      .eq('list_id', listId);
    if (error) throw error;
    return data ?? [];
  }

  async saveItem(item: Item): Promise<void> {
    const { error } = await this.client.from('items').upsert({
      id: item.id,
      list_id: item.listId,
      name: item.name,
      store: item.store,
      in_cart: item.inCart,
      created_at: item.createdAt
    });
    if (error) throw error;
  }

  async updateItem(item: Item): Promise<void> {
    const { error } = await this.client
      .from('items')
      .update({ in_cart: item.inCart })
      .eq('id', item.id);
    if (error) throw error;
  }

  async deleteInCartItems(listId: string): Promise<void> {
    const { error } = await this.client
      .from('items')
      .delete()
      .eq('list_id', listId)
      .eq('in_cart', true);
    if (error) throw error;
  }

}
