import qs from 'qs';
import { AppPath, type SettingsPath } from '../../types';
import { isDefined } from '../validation';
import { generateTypedPath } from './internal/generateTypedPath';
import { type RoutePathParams } from './internal/RoutePathParams';

export const getSettingsPath = <T extends SettingsPath>(
  to: T,
  params?: RoutePathParams<`/${AppPath.Settings}/${T}`>,
  queryParams?: Record<string, any>,
  hash?: string,
) => {
  const fullPath = `/${AppPath.Settings}/${to}` as const;
  let path: string = fullPath;

  if (isDefined(params)) {
    path = generateTypedPath(fullPath, params);
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

  if (isDefined(hash)) {
    path += `#${hash.replace(/^#/, '')}`;
  }

  return path;
};
