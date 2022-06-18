export enum Namespaces {
  Auth = 'auth',
  Users = 'users',
  Food = 'food'
}

export const serverUrls = {
  [Namespaces.Auth]: {
    login: 'login'
  },
  [Namespaces.Users]: {
    get: '',
    single: ':id',
    create: '',
    update: ':id'
  },
  [Namespaces.Food]: {
    group: 'group',
    stats: 'stats/:week',
    weekly: '',
    single: ':id',
    create: '',
    update: ':id',
    delete: ':id'
  }
};

type ReType = typeof serverUrls

const reduceNamespace = <T extends ReType, O extends Namespaces>(acc: T, namespace: O): T => {
  return {
    ...acc,
    [namespace]: (Object.keys(serverUrls[namespace]) as (keyof ReType[O])[]).reduce((acc, key) => ({
      ...acc,
      [key]: [namespace, serverUrls[namespace][key]].join('/')
    }), {})
  };
};

const generateClientUrls = <T extends ReType>(): T => {
  return (Object.keys(serverUrls) as Namespaces[]).reduce(reduceNamespace, {} as T);
};

export const clientUrls = generateClientUrls();
