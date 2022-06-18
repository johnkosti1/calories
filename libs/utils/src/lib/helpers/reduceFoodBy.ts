import { IFood } from '../types';

export function reduceFoodBy(data: IFood[], keyGenerator: (_: IFood) => string): Record<string, IFood[]> {
  return data.reduce((acc, item) => {
    const key = keyGenerator(item);
    return ({
      ...acc,
      [key]: [...(acc[key] || []), item]
    });
  }, {} as Record<string, IFood[]>);
}
