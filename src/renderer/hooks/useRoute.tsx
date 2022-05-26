import { useMemo } from 'react';
import { Route } from 'react-router-dom';

const useRoute = (path: string, route: RouteInterface[]) => {
  const render = useMemo(
    () =>
      route.map((item) => {
        const RouteComponent = item.element;

        return (
          <Route
            path={`${path}${item.path}`}
            element={<RouteComponent />}
            key={item.path}
          />
        );
      }),
    [path, route]
  );

  return render;
};

export default useRoute;
