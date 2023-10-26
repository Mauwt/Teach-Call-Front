import React from 'react';
import { Route } from 'react-router-dom';

type Props = {
  Component: React.FC;
  rest: any[];
};

export default function ProtectedRoute({ Component, ...rest }: Props) {
  return <Route />;
}
