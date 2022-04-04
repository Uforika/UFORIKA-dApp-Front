import React, { FC, memo } from 'react';
import { useApiPosts } from '@services/api/posts.api';
import Link from 'next/link';

type Props = {
  title: string;
};

const MainPage: FC<Props> = ({ title }) => {

  const posts = useApiPosts(2);

  return (
    <div>
      <h2>{title}</h2>
      <br />
      <Link href="/second">To Second page</Link>
      <br />
      <br />
      <ul>
        {posts.map((post) => <li key={post.id}>{post.key}</li>)}
      </ul>
    </div>
  );
};

export default memo(MainPage);
