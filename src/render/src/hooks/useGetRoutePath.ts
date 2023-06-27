import { useMemo } from 'react';
import { get } from 'lodash';
import { useMatch } from 'react-router-dom';

const useGetRoutePath = (routPath: string) => {
  const match = useMatch(routPath);

  const path = useMemo(() => {
    const currentPath = get(match, 'pathname', '/');

    return currentPath === '/' ? '' : currentPath;
  }, [match]);

  return path;
};

export default useGetRoutePath;
