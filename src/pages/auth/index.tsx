import React from 'react';
import AuthPage from '@containers/AuthPage';
import { Page } from '../../types/next.types';

const PageAuth: Page = () => <AuthPage />;

PageAuth.allowWithoutAuth = true;

export default PageAuth;
