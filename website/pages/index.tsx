import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Tooltip } from 'reactstrap';
import styles from '../styles/Home.module.css';

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
          rapida helps you create interactive 3d content for the web
          &#x1f919;
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
            <strong>This project is under active alpha development.</strong>
          </p>

          <p>
            Things will{' '}
            <em>
              change and break <strong>regularly</strong>
            </em>
            . We are still experimenting, so you can expect usage to change with
            each release right now.
          </p>
          <p>
            Docs & Storybooks with examples will be coming to this website soon.
          </p>
          <p>
            <strong>
              We do not recommend using rapida in production just yet, but watch
              this space!
            </strong>
          </p>
          <p>&#9888; &#9888; &#9888;</p>
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
