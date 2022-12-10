import React from 'react';

const authRoute = [
  {
    key: 'login',
    path: '/login',
    component: React.lazy(() => import('../../views/auth/Login')),
    authority: [],
  },
];

export default authRoute;
