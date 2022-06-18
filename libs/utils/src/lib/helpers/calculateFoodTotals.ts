import { IFood, IFoodAverages } from '../types';
import { roundTo2Decimals } from './roundTo2Decimals';

export function calculateFoodTotals(data: IFood[]): IFoodAverages {
  const totalCalories = data.reduce((sum, current) => sum + current.calorie, 0);
  const totalPrice = data.reduce((sum, current) => sum + current.price, 0);
  const averageCalories = roundTo2Decimals(totalCalories ? totalCalories / data.length : 0);
  const averagePrice = roundTo2Decimals(totalPrice ? totalPrice / data.length : 0);

  return {
    totalCalories,
    totalPrice,
    averageCalories,
    averagePrice,
    count: data.length
  };
}
