import { useState, useRef, useMemo } from 'react';
import { Mode } from '../enums/Mode.enum';
import type { Identities } from '../type';

const useLogin = () => {
  const [mode, setMode] = useState<Mode>(Mode.LOGIN);

  const [identities, setIdentities] = useState<Identities[]>([]);

  const loginParamsRef = useRef<any>(null);

  const contextDefault = useMemo(
    () => ({
      mode,
      setMode,
      identities,
      setIdentities,
      loginParamsRef,
    }),
    [mode, setMode, identities, setIdentities, loginParamsRef]
  );

  return {
    mode,
    setMode,
    identities,
    setIdentities,
    loginParamsRef,
    contextDefault,
  };
};

export default useLogin;
