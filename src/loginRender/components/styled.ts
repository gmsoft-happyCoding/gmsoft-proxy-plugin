import styled from 'styled-components';
import LoginPhoto from '../images/login.jpg';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 1100px;
  min-height: 800px;
  box-sizing: border-box;
  overflow: auto;
`;

export const ContentWrapper = styled.div`
  box-sizing: border-box;
  height: 100px;
  min-height: 100%;
  padding-bottom: 185px;
`;

export const LoginHead = styled.div`
  width: 1100px;
  font-size: 27px;
  padding: 50px 0;
  margin: 0 auto;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const bgPath = (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `/dev-login${path}`;
  }
  return path;
};

export const ContentMain = styled.div`
  height: calc(100% - 140px);
  background-image: url(${bgPath(LoginPhoto)});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ContentBox = styled.div`
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

export const LoginFrameWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  width: 380px;
  height: 379px;
  overflow: auto;
  background: #fff;
  transform: translate3d(0, -50%, 0);
`;
