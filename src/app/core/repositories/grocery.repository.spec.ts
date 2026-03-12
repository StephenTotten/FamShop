import { TestBed } from '@angular/core/testing';
import { GroceryRepository } from './grocery.repository';
import { STORAGE_TOKEN } from '../interfaces/storage.interface';

describe('GroceryRepository', () => {
  let repository: GroceryRepository;
  let mockStorage: any;

  beforeEach(() => {
    mockStorage = jasmine.createSpyObj('IStorage', ['get', 'set', 'remove']);
    
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
    mockStorage.get.and.returnValue(mockLists);
    
    const result = repository.getLists();
    
    expect(result).toEqual(mockLists);
    expect(mockStorage.get).toHaveBeenCalled();
  });

  it('should save lists to storage', () => {
    const lists = [{ id: '1', name: 'Test List' }];
    
    repository.saveLists(lists);
    
    expect(mockStorage.set).toHaveBeenCalledWith(jasmine.any(String), lists);
  });
});
