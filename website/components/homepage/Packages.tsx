import Link from 'next/link';
import React from 'react';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';

const packages = [
  {
    name: '@rapidajs/recs',
    description:
      '@rapidajs/recs helps you build and structure games and other demanding applications.',
    links: [
      {
        name: 'Docs',
        href: '/docs/recs/README',
      },
      {
        name: 'Examples',
        href: '/storybooks/recs/index.html',
      },
      {
        name: 'GitLab',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/recs',
      },
    ],
  },
  {
    name: '@rapidajs/three',
    description:
      '@rapidajs/three contains three.js utilities for managing multiple views, using postprocessing effects, and loading assets.',
    links: [
      {
        name: 'Docs',
        href: '/docs/three/README',
      },
      {
        name: 'Examples',
        href: '/storybooks/three/index.html',
      },
      {
        name: 'GitLab',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/three',
      },
    ],
  },
  {
    name: '@rapidajs/cannon-worker',
    description:
      '@rapidajs/cannon-worker makes adding cannon physics to your three.js scenes easy!',
    links: [
      {
        name: 'Docs',
        href: '/docs/cannon-worker/README',
      },
      {
        name: 'Examples',
        href: '/storybooks/cannon-worker/index.html',
      },
      {
        name: 'GitLab',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/cannon-worker',
      },
    ],
  },
];

const PackagesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 3em;

  display: grid;
  gap: 3em;

  grid-template-columns: repeat(1, minmax(0, 1fr));

  font-size: 0.8rem;

  ${up('sm')} {
    font-size: 1rem;
  }

  ${up('md')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Package = styled.div`
  border: 1px solid #333;
  border-radius: 0.5em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PackageTop = styled.div`
  padding: 1em;
`;

const PackageTitle = styled.h3`
  font-size: 1.1rem;
  font-family: ${(p) => p.theme.fonts.rapida};
  word-break: break-word;

  ${up('md')} {
    font-size: 1.2rem;
  }
`;

const PackageDescription = styled.p`
  font-size: 1rem;
`;

const PackageBottom = styled.div`
  width: 100%;
`;

const PackageLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: space-evenly;
  width: 100%;
  border-top: 1px solid #333;
`;

const PackageLink = styled.div`
  padding: 0.5em;
  display: block;

  font-family: ${(p) => p.theme.fonts.rapida};
  font-weight: 600;
`;

export const Packages = () => (
  <PackagesContainer>
    {packages.map((p) => (
      <Package key={p.name}>
        <PackageTop>
          <PackageTitle>{p.name}</PackageTitle>
          <PackageDescription>{p.description}</PackageDescription>
        </PackageTop>
        <PackageBottom>
          <PackageLinks>
            {p.links.map((l) => (
              <PackageLink key={l.name}>
                <Link href={l.href}>
                  <a>{l.name}</a>
                </Link>
              </PackageLink>
            ))}
          </PackageLinks>
        </PackageBottom>
      </Package>
    ))}
  </PackagesContainer>
);
