import { TestBed } from '@angular/core/testing';
import { LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  let service: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorage);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve data', () => {
    const testData = { name: 'test' };
    service.set('test-key', testData);
    const result = service.get('test-key');
    expect(result).toEqual(testData);
  });

  it('should return null for non-existent key', () => {
    const result = service.get('non-existent');
    expect(result).toBeNull();
  });

  it('should remove data', () => {
    service.set('test-key', 'test-value');
    service.remove('test-key');
    const result = service.get('test-key');
    expect(result).toBeNull();
  });
});
