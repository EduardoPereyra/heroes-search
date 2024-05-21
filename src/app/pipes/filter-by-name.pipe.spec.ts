import { FilterByNamePipe } from './filter-by-name.pipe';

describe('FilterByNamePipe', () => {
  let pipe: FilterByNamePipe;

  beforeEach(() => {
    pipe = new FilterByNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if items is null', () => {
    const result = pipe.transform([], 'searchText');
    expect(result).toEqual([]);
  });

  it('should return the original array if searchText is empty', () => {
    const items = [{ name: 'Test Hero' }];
    const result = pipe.transform(items, '');
    expect(result).toEqual(items);
  });

  it('should filter the array based on the searchText', () => {
    const items = [
      { name: 'Test Hero' },
      { name: 'Another Hero' },
      { name: 'Hero Test' },
    ];
    const result = pipe.transform(items, 'Test');
    expect(result).toEqual([{ name: 'Test Hero' }, { name: 'Hero Test' }]);
  });

  it('should be case insensitive when filtering', () => {
    const items = [
      { name: 'Test Hero' },
      { name: 'Another Hero' },
      { name: 'Hero Test' },
    ];
    const result = pipe.transform(items, 'test');
    expect(result).toEqual([{ name: 'Test Hero' }, { name: 'Hero Test' }]);
  });

  it('should handle empty items array', () => {
    const items: any[] = [];
    const result = pipe.transform(items, 'test');
    expect(result).toEqual([]);
  });
});
