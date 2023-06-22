import { Array } from '../../../util';

describe('Array', () => {
  it('returns an empty array when the input array is empty', async (): Promise<void> => {
    const array: number[] = [];
    const filterFn = async (item: number): Promise<boolean> => Promise.resolve(item % 2 === 0);
    const result = await Array.filterArrayAsync(array, filterFn);
    expect(result).toEqual([]);
  });

  it('returns an empty array when no items match the filter', async (): Promise<void> => {
    const array: number[] = [1, 3, 5];
    const filterFn = async (item: number): Promise<boolean> => Promise.resolve(item % 2 === 0);
    const result = await Array.filterArrayAsync(array, filterFn);
    expect(result).toEqual([]);
  });

  test('returns the filtered array with matching items', async () => {
    const array = [1, 2, 3, 4, 5];
    const filterFn = async (item: number): Promise<boolean> => Promise.resolve(item % 2 === 0);
    const result = await Array.filterArrayAsync(array, filterFn);
    expect(result).toEqual([2, 4]);
  });
});
