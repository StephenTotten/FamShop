# Architecture Documentation

## Storage Abstraction Layer

The application uses a storage abstraction layer to support easy migration from localStorage to Supabase in the future.

### Structure

```
core/
├── interfaces/
│   └── storage.interface.ts    # IStorage interface
├── services/
│   ├── local-storage.ts        # LocalStorage implementation
│   └── list.ts                 # Business logic service
├── repositories/
│   └── grocery.repository.ts   # Data access layer
├── providers/
│   └── storage.provider.ts     # DI configuration
└── models/
    ├── item.model.ts
    └── list.model.ts
```

### Key Components

#### IStorage Interface
Defines the contract for storage implementations:
- `get<T>(key: string): T | null`
- `set(key: string, value: any): void`
- `remove(key: string): void`

#### LocalStorage
Current implementation using browser localStorage. Implements `IStorage`.

#### GroceryRepository
Data access layer that uses `IStorage` to persist lists and items. Uses environment configuration for storage keys.

#### ListService
Business logic layer that orchestrates repository operations.

### Migration to Supabase

To migrate to Supabase:

1. Create `SupabaseStorage` class implementing `IStorage`
2. Update `storage.provider.ts` to use `SupabaseStorage`
3. No changes needed in `GroceryRepository` or `ListService`

Example:
```typescript
// supabase-storage.ts
export class SupabaseStorage implements IStorage {
  constructor(private supabase: SupabaseClient) {}
  
  async get<T>(key: string): Promise<T | null> {
    // Supabase implementation
  }
  
  async set(key: string, value: any): Promise<void> {
    // Supabase implementation
  }
  
  async remove(key: string): Promise<void> {
    // Supabase implementation
  }
}

// storage.provider.ts
export const STORAGE_PROVIDER: Provider = {
  provide: STORAGE_TOKEN,
  useClass: SupabaseStorage  // Changed from LocalStorage
};
```

### Environment Configuration

Storage keys are configured in `src/environments/environment.ts`:
```typescript
export const environment = {
  storage: {
    listsKey: 'famshop_lists',
    itemsKey: 'famshop_items'
  }
};
```

This allows different storage keys for development and production environments.
