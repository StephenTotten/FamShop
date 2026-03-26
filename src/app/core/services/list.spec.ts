import { TestBed } from '@angular/core/testing';
import { SupabaseRepository } from '../repositories/supabase.repository';
import { ListService } from './list';
import { Item } from '../models/item.model';
import { ANY_STORE } from '../models/store.constants';
import { vi } from 'vitest';

describe('ListService', () => {
  let service: ListService;
  let repoSpy: {
    getItems: ReturnType<typeof vi.fn>;
    updateItemStore: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repoSpy = {
      getItems: vi.fn(),
      updateItemStore: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: SupabaseRepository, useValue: repoSpy as unknown as SupabaseRepository }
      ]
    });

    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the store for the matching item id', async () => {
    repoSpy.updateItemStore.mockResolvedValue(undefined);

    await service.updateItemStore('1', 'Aldi');

    expect(repoSpy.updateItemStore).toHaveBeenCalledWith('1', 'Aldi');
  });

  it('should set the store to Any store when selected', async () => {
    repoSpy.updateItemStore.mockResolvedValue(undefined);

    await service.updateItemStore('1', ANY_STORE);

    expect(repoSpy.updateItemStore).toHaveBeenCalledWith('1', ANY_STORE);
  });

  it('should not save when item id is not found', async () => {
    repoSpy.updateItemStore.mockResolvedValue(undefined);

    await service.updateItemStore('missing', 'Aldi');

    expect(repoSpy.updateItemStore).toHaveBeenCalledWith('missing', 'Aldi');
  });
});
