import React from 'react';
import styled from 'styled-components';

const packages = [
  {
    name: '@rapidajs/rapida',
    description:
      'rapida is a javascript package that helps you create interactive 3d content for the web. It is the culmination of all of the @rapidajs packages.',
    links: [
      {
        name: 'NPM',
        href: 'https://www.npmjs.com/package/@rapidajs/rapida',
      },
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
        name: 'NPM',
        href: 'https://www.npmjs.com/package/@rapidajs/cannon-worker',
      },
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
        name: 'NPM',
        href: 'https://www.npmjs.com/package/@rapidajs/recs',
      },
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
        name: 'NPM',
        href: 'https://www.npmjs.com/package/@rapidajs/postprocessing',
      },
      {
        name: 'Source',
        href: 'https://gitlab.com/rapidajs/rapida/-/tree/main/packages/postprocessing',
      },
    ],
  },
];

const PackagesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 3em;

  display: grid;
  gap: 3em;

  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media screen and (min-width: 1024px) {
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
  font-size: 1.2rem;
  font-family: ${(p) => p.theme.fonts.rapida};
`;

const PackageDescription = styled.p`
  font-size: 0.9rem;
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

const PackageLink = styled.a`
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
              <PackageLink href={l.href} key={l.name}>
                {l.name}
              </PackageLink>
            ))}
          </PackageLinks>
        </PackageBottom>
      </Package>
    ))}
  </PackagesContainer>
);
