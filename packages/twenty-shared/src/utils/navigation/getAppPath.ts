import qs from 'qs';
import { type AppPath } from '../../types';
import { isDefined } from '../validation';
import { generateTypedPath } from './internal/generateTypedPath';
import { type RoutePathParams } from './internal/RoutePathParams';

export const getAppPath = <T extends AppPath>(
  to: T,
  params?: RoutePathParams<T>,
  queryParams?: Record<string, any>,
) => {
  let path: string = to;

  if (isDefined(params)) {
    path = generateTypedPath(to, params);
  }

  if (isDefined(queryParams)) {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => isDefined(value)),
    );

    const queryString = qs.stringify(filteredParams);

    if (queryString !== '') {
      path += `?${queryString}`;
    }
  }

  return path;
};
