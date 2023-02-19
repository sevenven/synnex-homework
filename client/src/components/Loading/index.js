import React from 'react';
import { Spin } from "antd";
import { createNamespace } from '../../util';
import './style.scss';

const [prefixCls] = createNamespace('loading');

function Loading() {
  return (
    <div className={prefixCls}>
      <Spin size="large" />
    </div>
  );
}

export default Loading;
