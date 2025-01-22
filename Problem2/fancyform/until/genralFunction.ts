export interface ObjValue {
  key: string;
  value: string;
}

export const ObjectToArray = <T extends object>(obj: T) => {
  const arr: ObjValue[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const item: ObjValue = {
      key: key,
      value: value,
    };
    arr.unshift(item);
  }
  return arr;
};
