import { HeadlessEngineCommandWrapperEffect } from '@/command-menu-item/engine-command/components/HeadlessEngineCommandWrapperEffect';
import { useNavigate } from 'react-router-dom';
import { type AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';

export const HeadlessNavigateEngineCommand = <T extends AppPath>({
  to,
  params,
  queryParams,
}: {
  to: T;
  params?: Parameters<typeof getAppPath<T>>[1];
  queryParams?: Record<string, any>;
}) => {
  const navigate = useNavigate();
  const path = getAppPath(to, params, queryParams);

  // eslint-disable-next-line twenty/no-navigate-prefer-link
  const onExecute = () => {
    navigate(path);
  };

  return <HeadlessEngineCommandWrapperEffect execute={onExecute} />;
};
