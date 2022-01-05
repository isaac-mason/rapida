import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { FindUs } from '../components/FindUs';
import { Packages } from '../components/Packages';
import { PageContainer, PageMain } from '../components/Page';

const CodeBlock = styled.code`
  background-color: #333;
  color: #fafafa;
  border-radius: 5px;
  padding: 2rem;
  font-size: 1.1rem;
  font-family: $rapida-font;
  margin-bottom: 3em;

  font-size: 1.1rem;
  font-family: $rapida-font;

  a {
    cursor: pointer;
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  font-weight: 300;
  font-family: ${(p) => p.theme.fonts.rapida};
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  margin: 1.5em 0;
  max-width: 800px;
  font-family: ${(p) => p.theme.fonts.rapida};
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.5;

  @media screen and (max-width: 500px) {
    text-align: left;
  }
`;

const Warning = styled.div`
background-color: #fff399;
  border-radius: 5px;
  padding: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  max-width: 700px;
  text-align: center;
  margin-bottom: 3em;

  p:last-child {
    margin-bottom: 0;
  }
`;

const Home: NextPage = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  return (
    <PageContainer>
      <Head>
        <title>rápida - 3D for the Web</title>
        <meta
          name="description"
          content="rapida makes creating interactive 3d content for the web with three.js easy!"
        />
      </Head>

      <PageMain>
        <Title>rápida</Title>

        <Description>
          rapida helps you create interactive 3d content for the web &#x1f919;
        </Description>

        <CodeBlock>
          <a
            href="#"
            id="copyInstallCommand"
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
        </CodeBlock>

        <Warning>
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
        </Warning>

        <Packages />

        <FindUs />
      </PageMain>
    </PageContainer>
  );
};

export default Home;
