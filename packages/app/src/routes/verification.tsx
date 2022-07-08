import React, { FC, useMemo } from 'react';

import { getToken } from '@/utils/token';
import { Navigate } from 'react-router-dom';

interface Props {
  redirect: string;
  children: React.ReactElement;
}

const View: FC<Props> = (props) => {
  const { children, redirect } = props;

  return useMemo(() => {
    if (!getToken()) {
      return <Navigate to={redirect} replace />;
    }
    return children;
  }, [children, redirect]);
};

export default View;
