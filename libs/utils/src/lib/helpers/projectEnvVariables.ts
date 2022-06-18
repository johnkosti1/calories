import { ProjectVariables } from '../types';

export function projectEnvVariables(): ProjectVariables {
  const maxCalories = +(process.env.NX_DEFAULT_MAX_CALORIES_DAILY || '0')
  const maxBudget = +(process.env.NX_DEFAULT_MAX_BUDGET_MONTH || '0')

  return {
    maxCalories: isNaN(maxCalories) ? 0 : maxCalories,
    maxBudget: isNaN(maxBudget) ? 0 : maxBudget,
  }
}
