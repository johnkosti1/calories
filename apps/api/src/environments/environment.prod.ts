import { projectEnvVariables } from '@toptal-calories/utils';
import { IEnvironment } from '@calories/utils/types';
import { buildDatesObject } from '@toptal-calories/utils';

export const environment: IEnvironment = {
  production: true,
  dateFormats: buildDatesObject(process.env.NX_DATE_SEPARATOR),
  projectVariables: projectEnvVariables()
};
