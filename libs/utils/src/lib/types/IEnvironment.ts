import { ProjectVariables } from './IProjectVariables';

export interface DateFormats {
  dateTimeFormat: string
  clientDateFormat: string
  dateFormat: string
  monthYear: string
}

export interface IEnvironment {
  production: boolean
  dateFormats: DateFormats
  projectVariables: ProjectVariables
}
