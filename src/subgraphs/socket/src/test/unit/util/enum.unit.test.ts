import { Enum, getEnumKey } from '../../../util';

const Colors = Enum({
  Red: 'red color',
  Green: 'green color',
  Blue: 'blue',
});

describe('Enum', () => {
  it('should return the correct value for a valid enum key', () => {
    expect(Colors.Red).toBe('red color');
    expect(Colors.Green).toBe('green color');
    expect(Colors.Blue).toBe('blue');
  });

  it('should throw an error for an invalid enum key', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => Colors.Yellow).toThrow('"Yellow" value does not exist in the enum');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => Colors.Orange).toThrow('"Orange" value does not exist in the enum');
  });

  it('should throw an error when attempting to add a new value', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Colors.Yellow = 'yellow';
    }).toThrow('Cannot modify or add a new value to the enum');
  });

  it('should not allow modification of existing values', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Colors.Red = 'newRed';
    }).toThrow('Cannot modify or add a new value to the enum');
  });
});

describe('getEnumKey', () => {
  it('should return the corresponding key if value belongs to the enum', () => {
    expect(getEnumKey(Colors, Colors.Red)).toEqual('Red');
  });

  it('should return the value itself if it does not belong to the enum', () => {
    expect(getEnumKey(Colors, 'Unknown Value')).toEqual('Unknown Value');
  });

  it('should return null if null value is passed', () => {
    expect(getEnumKey(Colors, Colors.Null)).toEqual('Null');
  });
});
