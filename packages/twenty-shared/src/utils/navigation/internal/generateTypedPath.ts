import { generatePath } from 'react-router-dom';

import { type RoutePathParams } from './RoutePathParams';

export const generateTypedPath = <Path extends string>(
  path: Path,
  params: RoutePathParams<Path>,
): string => generatePath<string>(path, params);
