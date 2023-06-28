import { useState, useCallback } from "react";

const useHandle = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const drawerOpen = useCallback(() => {
    setDrawerVisible(true);
  }, [setDrawerVisible]);

  const drawerClose = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  return { drawerVisible, drawerClose, drawerOpen };
};

export default useHandle;
