import { IAuthorizedDto, ILogin } from '@calories/utils/types';
import { clientUrls, Namespaces } from '@calories/utils';
import { api } from '@toptal-calories/client-shared';

export const loginRequest = (params: ILogin): Promise<IAuthorizedDto> =>
  api.post(clientUrls[Namespaces.Auth].login, params)
    .then(res => res.data)
