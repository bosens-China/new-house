type FilterUndefinedValues<T> = {
  [K in keyof T]: T[K] extends undefined ? never : T[K];
};

export function filterUndefinedValues<T extends Record<any, any>>(obj: T): FilterUndefinedValues<T> {
  const filteredObj = {} as FilterUndefinedValues<T>;
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      filteredObj[key as keyof T] = value as FilterUndefinedValues<T>[keyof T];
    }
  }
  return filteredObj;
}
