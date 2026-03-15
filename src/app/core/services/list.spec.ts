import { TestBed } from '@angular/core/testing';
import { GroceryRepository } from '../repositories/grocery.repository';
import { ListService } from './list';
import { Item } from '../models/item.model';
import { ANY_STORE } from '../models/store.constants';
import { vi } from 'vitest';

describe('ListService', () => {
  let service: ListService;
  let repoSpy: {
    getItems: ReturnType<typeof vi.fn>;
    saveItems: ReturnType<typeof vi.fn>;
    getLists: ReturnType<typeof vi.fn>;
    saveLists: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repoSpy = {
      getItems: vi.fn(),
      saveItems: vi.fn(),
      getLists: vi.fn(),
      saveLists: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: GroceryRepository, useValue: repoSpy as unknown as GroceryRepository }
      ]
    });

    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the store for the matching item id', () => {
    const items: Item[] = [
      {
        id: '1',
        listId: 'default',
        name: 'Milk',
        store: 'Costco',
        inCart: false,
        createdAt: new Date()
      },
      {
        id: '2',
        listId: 'default',
        name: 'Eggs',
        store: 'Target',
        inCart: false,
        createdAt: new Date()
      }
    ];

    repoSpy.getItems.mockReturnValue(items);

    service.updateItemStore('1', 'Aldi');

    expect(items[0].store).toBe('Aldi');
    expect(items[1].store).toBe('Target');
    expect(repoSpy.saveItems).toHaveBeenCalledWith(items);
  });

  it('should set the store to Any store when selected', () => {
    const items: Item[] = [
      {
        id: '1',
        listId: 'default',
        name: 'Bread',
        store: 'Walmart',
        inCart: false,
        createdAt: new Date()
      }
    ];

    repoSpy.getItems.mockReturnValue(items);

    service.updateItemStore('1', ANY_STORE);

    expect(items[0].store).toBe(ANY_STORE);
    expect(repoSpy.saveItems).toHaveBeenCalledWith(items);
  });

  it('should not save when item id is not found', () => {
    repoSpy.getItems.mockReturnValue([]);

    service.updateItemStore('missing', 'Aldi');

    expect(repoSpy.saveItems).not.toHaveBeenCalled();
  });
});
