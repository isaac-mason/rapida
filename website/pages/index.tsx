import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>rapida - 3D for the Web</title>
        <meta
          name="description"
          content="rapida makes creating interactive 3d content for the web with three.js easy!"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>rapida</h1>

        <p className={styles.description}>
          rapida makes creating interactive 3d content for the web easy
          &#x1f919;
        </p>

        <p className={styles.warning}>
          &#9888; &#9888; &#9888; <br />
          This project is under active alpha development. Things <em>will change and
          or break</em> regularly.
          <br />
          <br />
          Docs & Storybooks with examples will be coming to this website soon.
          <br />
          <br />
          We do not recommend using rapida in production
          just yet, but watch this space!
          <br /> &#9888; &#9888; &#9888;
        </p>

        <code className={styles.codeBlock}>
          &gt; npm install @rapidajs/rapida three@^0.133.0
          <br />
          <br />
          &gt; yarn add @rapidajs/rapida three@^0.133.0
        </code>
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
