import styled from 'styled-components';
import { Form, Input, Button, Alert } from 'antd';

const Wraper = styled.div`
  width: 380px;
  background: #fff;
  border-radius: 4px;
  padding: 20px 40px 40px 40px;
`;

const HeadTitle = styled.div`
  padding: 20px 0 35px 0;
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
  color: rgba(0, 0, 0, 0.65);
`;

const ErrorTitle = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
`;

const PackInput = styled(Input)`
  .ant-input-suffix {
    i {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.25);
    }
  }
  &:hover {
    .ant-input-suffix {
      i {
        color: #40a9ff;
      }
    }
  }
`;

const PackButton = styled(Button)`
  &.ant-btn {
    height: 38px;
  }
`;

const PackResetButton = styled(Button)`
  &.ant-btn {
    padding: 0;
    min-width: 0;
  }
`;

const OtherFormItem = styled(Form.Item)`
  text-align: right;
  &.ant-form-item {
    margin-bottom: 10px;
  }
  & .ant-form-item-control {
    line-height: 29px;
  }
`;

const PackAlert = styled(Alert)`
  &.ant-alert {
    padding: 2px 15px 2px 37px;
    .ant-alert-icon {
      top: 6.5px;
    }
  }
`;

export {
  Wraper,
  HeadTitle,
  ErrorTitle,
  PackInput,
  OtherFormItem,
  PackButton,
  PackResetButton,
  PackAlert,
};
