import { Spin } from "antd";
import { SpinProps } from "antd/es/spin";
import styled from "styled-components";

const Wrap = styled.div`
  text-align: center;
`;

const StyledSpin = styled(Spin)<SpinProps>`
  padding: 20px 0;
`;

const Loading = () => (
  <Wrap>
    <StyledSpin />
  </Wrap>
);

export default Loading;
