export const filterArrayAsync = async <T>(array: T[], filterFn: (item: T) => Promise<boolean>): Promise<T[]> => {
  const filteredArray: T[] = [];

  for (const item of array) {
    const isMatch = await filterFn(item);

    if (isMatch) {
      filteredArray.push(item);
    }
  }

  return filteredArray;
};
