export const getEnumKey = <T extends Record<string, string>>(
  enumObj: T,
  value: string | null | undefined,
): keyof T | string | null => {
  const enumKeys = Object.keys(enumObj) as Array<keyof T>;
  for (const key of enumKeys) {
    if (enumObj[key] === value) {
      return key;
    }
  }
  return value || null;
};

type EnumType<T> = {
  [K in keyof T]: T[K] extends string | number ? T[K] : null;
};

const Enum = <T extends EnumType<T>>(baseEnum: T): Readonly<T> => {
  const enumWithNull = {
    ...baseEnum,
    Null: null,
  };

  return new Proxy(enumWithNull, {
    get: (_, name): T => {
      const propName = name.toString() as keyof T;
      if (!enumWithNull.hasOwnProperty(propName)) {
        throw new Error(`"${propName.toString()}" value does not exist in the enum`);
      }
      return enumWithNull[propName];
    },
    set: (): never => {
      throw new Error('Cannot modify or add a new value to the enum');
    },
  }) as Readonly<T>;
};

export default Enum;
