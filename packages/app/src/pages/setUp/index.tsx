import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import _ from 'lodash-es';
import Template from './template';
import Timing from './timing';

const { TabPane } = Tabs;

const View = () => {
  const tabs = useMemo(
    () => [
      {
        tab: '拉取频率',
        key: 'Timing',
        Components: Timing,
      },
      {
        tab: '推送模板设置',
        key: 'Template',
        Components: Template,
      },
    ],
    [],
  );
  const defaultActiveKey = useMemo(() => _.head(tabs)?.key, [tabs]);
  return (
    <Tabs defaultActiveKey={defaultActiveKey}>
      {tabs.map(({ Components, key, tab }) => (
        <TabPane tab={tab} key={key}>
          <Components />
        </TabPane>
      ))}
      )
    </Tabs>
  );
};

export default View;
