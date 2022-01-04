import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Tooltip } from 'reactstrap';
import styles from '../styles/Home.module.scss';

const packages = [
  {
    name: '@rapidajs/rapida',
    description:
      'rapida is a javascript package that helps you create interactive 3d content for the web. It is the culmination of all of the @rapidajs packages.',
    links: [
      {
        name: 'Examples',
        href: '/storybooks/rapida/index.html',
      },
      {
        name: 'Source',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/rapida',
      },
    ],
  },
  {
    name: '@rapidajs/cannon-worker',
    description:
      'cannon-worker is a javascript package that makes adding physics to your three.js scenes easy!',
    links: [
      {
        name: 'Examples',
        href: '/storybooks/cannon-worker/index.html',
      },
      {
        name: 'Source',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/cannon-worker',
      },
    ],
  },
  {
    name: '@rapidajs/recs',
    description:
      'recs is Reminiscent [of an] Entity Component System. It is the entity component system used in rapida, and it can also be used standalone.',
    links: [
      {
        name: 'Source',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/recs',
      },
    ],
  },
  {
    name: '@rapidajs/postprocessing',
    description:
      'postprocessing is a thin wrapper around vanruesc/postprocessing with typed effect factory functions. It is used in rapida to provide a typed way of creating post processing effects.',
    links: [
      {
        name: 'Source',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/postprocessing',
      },
    ],
  },
];
const Home: NextPage = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  return (
    <div className={styles.container}>
      <Head>
        <title>rápida - 3D for the Web</title>
        <meta
          name="description"
          content="rapida makes creating interactive 3d content for the web with three.js easy!"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>rápida</h1>

        <p className={styles.description}>
          rapida helps you create interactive 3d content for the web &#x1f919;
        </p>

        <code className={styles.codeBlock}>
          <div>
            <a
              href="#"
              id={'copyInstallCommand'}
              className={styles.copyInstallCommand}
              onClick={(e) => {
                window.navigator.clipboard.writeText(
                  'yarn add @rapidajs/rapida three'
                );
                setCopied(true);
              }}
            >
              &gt; yarn add @rapidajs/rapida @rapidajs/cannon-worker three
            </a>
            <Tooltip
              flip
              target="copyInstallCommand"
              placement="bottom"
              isOpen={copied}
            >
              Copied to clipboard!
            </Tooltip>
          </div>
        </code>

        <div className={styles.warning}>
          <p>&#9888; &#9888; &#9888;</p>
          <p>
            <strong>
              This project is under active alpha development. We do not
              recommend using rapida in production just yet, but watch this
              space!
            </strong>
          </p>
          <p>
            Things will{' '}
            <em>
              change and break <strong>regularly</strong>
            </em>
            . We are still experimenting, so you can expect usage to change with
            each release right now.
          </p>
          <p>&#9888; &#9888; &#9888;</p>
        </div>

        <div className={styles.packages}>
          {packages.map((p) => (
            <div className={styles.package} key={p.name}>
              <div className={styles.top}>
                <div className={styles.packageTitle}>{p.name}</div>
                <div className={styles.packageDescription}>{p.description}</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.packageLinks}>
                  {p.links.map((l) => (
                    <a href={l.href} key={l.name}>
                      {l.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.findUs}>
          <div className={styles.links}>
            <a
              href="https://gitlab.com/rapidajs/rapida"
              className={styles.code}
            >
              GitLab
            </a>
            <a
              href="https://github.com/rapidajs/rapida"
              className={styles.code}
            >
              GitHub (mirror)
            </a>
            <a
              href="https://www.npmjs.com/package/@rapidajs/rapida"
              className={styles.code}
            >
              NPM
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
