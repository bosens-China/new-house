import React, { FC, useEffect, useRef, createElement } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';

interface Props {
  children?: React.ReactNode;
}

export const View: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () => {
      const a = ReactDOM.createRoot(document.createElement('div')).render(React.createElement('div', {}));
      console.log(a);
    },
    // const shadow = ref.current!.attachShadow({ mode: 'open' });
    // React.Children.forEach(children, (item) => {
    //   console.log(item);
    // });

    () => {
      // // ref.current?.remove();
      // // // ref.current = documen
      // const App = () => React.createElement('div', {});
      // console.log(<App />);
    },
    [ref, children],
  );
  return <div ref={ref} />;
};

export const Style = () => {};
