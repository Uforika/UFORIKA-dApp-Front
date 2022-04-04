import React from 'react';
import { NextPage } from 'next';
import MainPage from '@containers/MainPage';

type Props = {
  title: string
}
const PageIndex: NextPage<Props> = ({ title }: Props) => <MainPage title={title} />;

PageIndex.getInitialProps = () => ({
  title: 'Test title',
});

export default PageIndex;
