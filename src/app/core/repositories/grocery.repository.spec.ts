import { TestBed } from '@angular/core/testing';
import { GroceryRepository } from './grocery.repository';
import { STORAGE_TOKEN } from '../interfaces/storage.interface';
import { ANY_STORE } from '../models/store.constants';
import { vi } from 'vitest';

describe('GroceryRepository', () => {
  let repository: GroceryRepository;
  let mockStorage: {
    get: ReturnType<typeof vi.fn>;
    set: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockStorage = {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn()
    };
    
    TestBed.configureTestingModule({
      providers: [
        GroceryRepository,
        { provide: STORAGE_TOKEN, useValue: mockStorage }
      ]
    });
    
    repository = TestBed.inject(GroceryRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should get lists from storage', () => {
    const mockLists = [{ id: '1', name: 'Test List' }];
    mockStorage.get.mockReturnValue(mockLists);
    
    const result = repository.getLists();
    
    expect(result).toEqual(mockLists);
    expect(mockStorage.get).toHaveBeenCalled();
  });

  it('should save lists to storage', () => {
    const lists = [{ id: '1', name: 'Test List' }];
    
    repository.saveLists(lists);
    
    expect(mockStorage.set).toHaveBeenCalledWith(expect.any(String), lists);
  });

  it('should normalize missing item store values to Any store', () => {
    mockStorage.get.mockReturnValue([
      {
        id: '1',
        listId: 'default',
        name: 'Milk',
        inCart: false,
        createdAt: new Date()
      }
    ]);

    const items = repository.getItems();

    expect(items[0].store).toBe(ANY_STORE);
  });
});
