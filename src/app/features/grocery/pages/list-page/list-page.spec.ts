import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ListPage } from './list-page';
import { ListService } from '../../../../core/services/list';
import { Item } from '../../../../core/models/item.model';
import { ANY_STORE } from '../../../../core/models/store.constants';
import { GroceryModule } from '../../grocery-module';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;
  let listServiceSpy: {
    getItemsForList: ReturnType<typeof vi.fn>;
    addItem: ReturnType<typeof vi.fn>;
    toggleItem: ReturnType<typeof vi.fn>;
    deleteInCartItems: ReturnType<typeof vi.fn>;
    updateItemStore: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    listServiceSpy = {
      getItemsForList: vi.fn(),
      addItem: vi.fn(),
      toggleItem: vi.fn(),
      deleteInCartItems: vi.fn(),
      updateItemStore: vi.fn()
    };

    const baseItems: Item[] = [
      {
        id: 'item-1',
        listId: 'default',
        name: 'Milk',
        store: 'Target',
        inCart: false,
        createdAt: new Date()
      }
    ];

    listServiceSpy.getItemsForList.mockResolvedValue(baseItems);

    listServiceSpy.addItem.mockResolvedValue(undefined);
    listServiceSpy.toggleItem.mockResolvedValue(undefined);
    listServiceSpy.deleteInCartItems.mockResolvedValue(undefined);
    listServiceSpy.updateItemStore.mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [GroceryModule],
      providers: [
        { provide: ListService, useValue: listServiceSpy as unknown as ListService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open an item store picker when the badge is clicked', () => {
    const trigger: HTMLButtonElement = fixture.nativeElement.querySelector('.item-store-trigger');

    trigger.click();
    fixture.detectChanges();

    const picker: HTMLSelectElement | null = fixture.nativeElement.querySelector('.item-store-picker');
    expect(picker).not.toBeNull();
    expect(component.activeStorePickerItemId).toBe('item-1');
  });

  it('should update item store and close picker when a store is selected', () => {
    component.activeStorePickerItemId = 'item-1';
    fixture.detectChanges();

    const picker: HTMLSelectElement = fixture.nativeElement.querySelector('.item-store-picker');
    picker.value = 'Aldi';
    picker.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(listServiceSpy.updateItemStore).toHaveBeenCalledWith('item-1', 'Aldi');
    expect(component.activeStorePickerItemId).toBeNull();
  });

  it('should clear item store when no store is selected', () => {
    component.setItemStore('item-1', ANY_STORE);

    expect(listServiceSpy.updateItemStore).toHaveBeenCalledWith('item-1', ANY_STORE);
  });

  it('should create new items with Any store by default', () => {
    component.newItem = 'Bananas';
    component.selectedStore = ANY_STORE;

    component.addItem();

    const addedItem = listServiceSpy.addItem.mock.calls[0][0] as Item;
    expect(addedItem.store).toBe(ANY_STORE);
  });

  it('should close the store picker when clicking outside', () => {
    component.activeStorePickerItemId = 'item-1';
    fixture.detectChanges();

    document.body.click();
    fixture.detectChanges();

    expect(component.activeStorePickerItemId).toBeNull();
  });
});
