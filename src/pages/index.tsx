import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';
import Toggle from 'react-toggle';

import 'react-toggle/style.css';

import { getSortedPostsData } from '@/lib/posts';

import FormatDate from '@/components/format/data';
import { Star } from '@/components/icon/star';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

interface HomeProps {
  allPostsData: {
    id: string;
    date: any;
    title: string;
  }[];
}

// eslint-disable-next-line unused-imports/no-unused-vars
const HomePage: NextPage<HomeProps> = ({ allPostsData }) => {
  const { theme, setTheme } = useTheme();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className=' mx-auto max-w-2xl pt-8'>
        <header className=' mb-10'>
          <div className='flex items-center justify-between'>
            <h1>不止于钟鑫</h1>
            {/* <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              toggle
            </button> */}
            <label>
              <Toggle
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                checked={theme === 'dark'}
                icons={{
                  unchecked: <Star />,
                }}
              />
            </label>
          </div>
        </header>
        <div className=' mb-12 flex items-center'>
          <div
            style={{
              height: '80px',
              width: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
            className=' mr-2'
          >
            <Image
              src='/images/whoami.jpg'
              height={80}
              width={80}
              objectFit='cover'
              alt='我的照片'
            />
          </div>
          <div>
            <p>钟鑫的个人记录</p>
            <p>代码、生活和一切</p>
          </div>
        </div>
        <main className=' min-h-screen'>
          <section className=''>
            <ul className=''>
              {allPostsData.map(({ id, date, title }) => (
                <li className=' font-blod pb-10' key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>
                      <h3 className=' text-title-light dark:text-title-dark'>
                        {title}
                      </h3>
                    </a>
                  </Link>
                  <small className=''>
                    <FormatDate dateString={date} />
                  </small>
                  s
                </li>
              ))}
            </ul>
          </section>
        </main>
        <footer className=' sticky bottom-0 flex items-center justify-center text-gray-700'>
          <div className=' dark: flex w-48 flex-wrap justify-center text-title-light dark:text-title-dark'>
            <span>© {new Date().getFullYear()} By zx</span>
            <Link href='https://beian.miit.gov.cn' target='_blank'>
              蜀ICP备2022018754号-1
            </Link>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default HomePage;
