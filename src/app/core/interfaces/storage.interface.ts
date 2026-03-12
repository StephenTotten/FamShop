import { InjectionToken } from '@angular/core';

export interface IStorage {
  get<T>(key: string): T | null;
  set(key: string, value: any): void;
  remove(key: string): void;
}

export const STORAGE_TOKEN = new InjectionToken<IStorage>('IStorage');
