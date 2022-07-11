import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Layout from '@/layout';
import Verification from './verification';

const Login = lazy(() => import('@/pages/login'));
const Mailbox = lazy(() => import('@/pages/mailbox'));
const SetUp = lazy(() => import('@/pages/setUp'));

const View = () => (
  <BrowserRouter>
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/login" replace />} />
          <Route
            path="mailbox"
            element={
              <Verification redirect="/login">
                <Mailbox />
              </Verification>
            }
          />
          <Route
            path="SetUp"
            element={
              <Verification redirect="/login">
                <SetUp />
              </Verification>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default View;
