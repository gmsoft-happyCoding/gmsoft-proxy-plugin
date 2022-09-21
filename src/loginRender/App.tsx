import {
  MainWrapper,
  ContentWrapper,
  LoginHead,
  ContentMain,
  ContentBox,
  LoginFrameWrapper,
} from './components/styled';
import LoginFrame from './components/LoginFrame';
import SelectIdentities from './components/SelectIdentities';
import { useLogin } from './hooks';
import { Mode } from './enums/Mode.enum';
import Context from './Context';

const App = () => {
  const { mode, contextDefault } = useLogin();

  return (
    <Context.Provider value={contextDefault}>
      <MainWrapper>
        <ContentWrapper>
          <LoginHead>开发环境登录</LoginHead>
          <ContentMain>
            <ContentBox>
              <LoginFrameWrapper>
                {mode === Mode.LOGIN ? <LoginFrame /> : <SelectIdentities />}
              </LoginFrameWrapper>
            </ContentBox>
          </ContentMain>
        </ContentWrapper>
      </MainWrapper>
    </Context.Provider>
  );
};

export default App;
