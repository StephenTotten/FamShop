export const ANY_STORE = 'Any store';

export function normalizeStoreValue(store: string | null | undefined): string {
  const trimmedStore = (store ?? '').trim();
  return trimmedStore || ANY_STORE;
}
