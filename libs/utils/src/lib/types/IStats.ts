import { IFoodAverages, IGroupedWithUser } from './IGroupedFood';

export interface IStats {
  currentWeek: IFoodAverages,
  previousWeek: IFoodAverages,
  userTotals: IGroupedWithUser[],
  currentWeekDates: [string, string]
  previousWeekDates: [string, string]
}
