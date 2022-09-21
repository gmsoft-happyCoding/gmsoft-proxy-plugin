import React, { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Mode } from './enums/Mode.enum';
import type { Identities } from './type';

export interface ContextDefault {
  loginParams?: string;
  loginSuccessRedirectUri?: string;
  djcGatewayDomain?: string;
  mode?: Mode;
  setMode?: Dispatch<SetStateAction<Mode>>;
  identities?: Identities[];
  setIdentities?: Dispatch<SetStateAction<Identities[]>>;
  loginParamsRef?: MutableRefObject<any>;
  buildLoginParams?: object;
}

const Context = React.createContext<ContextDefault>({});

export default Context;
