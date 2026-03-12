import { Provider } from '@angular/core';
import { STORAGE_TOKEN } from '../interfaces/storage.interface';
import { LocalStorage } from '../services/local-storage';

export const STORAGE_PROVIDER: Provider = {
  provide: STORAGE_TOKEN,
  useClass: LocalStorage
};
