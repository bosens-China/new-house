import React, { FC, useEffect, useRef } from 'react';
// import { useAsyncEffect } from 'ahooks';

import { getDom } from './utils';

interface Props {
  children?: React.ReactNode;
}

export const View: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const shadow = ref.current?.shadowRoot ? ref.current.shadowRoot : ref.current!.attachShadow({ mode: 'open' });
    shadow.innerHTML = '';

    const arr: Array<Promise<string>> = [];
    React.Children.forEach(children, (item) => {
      arr.push(getDom(item));
    });
    Promise.all(arr).then((data) => {
      const str = data.reduce((x, y) => x + y, '');
      shadow.innerHTML = str;
    });
  }, [ref, children]);
  return <div ref={ref} />;
};

export const Style: FC<Props> = ({ children }) => <style>{children}</style>;
