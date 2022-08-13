// !STARTERCONF You can delete this page
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';

import { getAllPostIds, getPostData, PostData } from '@/lib/posts';

import FormatDate from '@/components/format/data';
import Layout from '@/components/layout/Layout';

interface IParams extends ParsedUrlQuery {
  id: string;
}
interface PostProps {
  postData: PostData;
}
const Post: NextPage<PostProps> = ({ postData }) => {
  return (
    <Layout>
      <>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className=''>{postData.title}</h1>
          <div className=''>
            <FormatDate dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const { id } = params as IParams;
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
