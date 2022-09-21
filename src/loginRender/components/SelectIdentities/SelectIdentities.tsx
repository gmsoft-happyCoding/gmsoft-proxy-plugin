import { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Mode } from '../../enums/Mode.enum';
import Context from '../../Context';
import type { Identities } from '../../type';
import { loginRequest } from '../LoginFrame/request';

const Container = styled.div`
  padding: 40px;
  position: relative;
  & .ant-btn {
    margin-bottom: 10px;
  }
`;

const LayoutIcon = styled(CloseCircleOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 30px;
  cursor: pointer;
`;

interface PackButtonProps {
  identities: Identities;
}

const PackButton = (props: PackButtonProps) => {
  const { identities } = props;

  const { buildLoginParams, loginParamsRef, loginSuccessRedirectUri } =
    useContext(Context);

  const btnClick = useCallback(() => {
    if (loginParamsRef) {
      loginParamsRef.current = {
        ...loginParamsRef.current,
        identities: identities.id,
      };

      loginRequest(
        loginParamsRef.current,
        buildLoginParams || {},
        loginSuccessRedirectUri || ''
      );
    }
  }, [identities, loginParamsRef, buildLoginParams, loginSuccessRedirectUri]);

  return (
    <Button block type="primary" size="small" onClick={btnClick}>
      {identities.name}
    </Button>
  );
};

const SelectIdentities = () => {
  const {
    identities = [],
    setIdentities,
    setMode,
    loginParamsRef,
  } = useContext(Context);

  const close = useCallback(() => {
    if (setMode) {
      setMode(Mode.LOGIN);
      if (loginParamsRef) {
        loginParamsRef.current = null;
      }
      if (setIdentities) {
        setIdentities([]);
      }
    }
  }, [setMode, setIdentities, loginParamsRef]);

  return (
    <Container>
      <LayoutIcon type="close" onClick={close} />
      {identities.map((item) => (
        <PackButton key={item.id} identities={item} />
      ))}
    </Container>
  );
};

export default SelectIdentities;
