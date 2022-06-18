
export interface IUser {
  _id?: string
  username: string
  firstName: string
  lastName: string
  isAdmin: boolean

  caloriePerDay: number
  budgetPerMonth: number
}

export interface IUserServer extends IUser {
  password: string
}
