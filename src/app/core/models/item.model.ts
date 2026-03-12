export interface Item {
  id: string;
  listId: string;
  name: string;
  store?: string;
  inCart: boolean;
  createdAt: Date;
}