import fs from 'fs';
import { GetStaticPropsContext } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import path from 'path';
import React, { useState } from 'react';
import rehypeSlug from 'rehype-slug';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { DocsSidebar } from '../../../components/docs/DocsSidebar';
import { DocsTopNav } from '../../../components/docs/DocsTopNav';
import { allPackages } from '../../../constants/all-packages';
import { Page } from '../../../types/docs/page';

type Props = {
  source: MDXRemoteSerializeResult;
  packages: typeof allPackages;
  currentPage: Page;
  pages: Page[];
};

const DocsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  font-family: Inter, sans-serif;
`;

const DocsMainWrapper = styled.div`
  padding: 1em;
  width: 100%;

  ${up('md')} {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding: 2em;
  }

  ${up('xxl')} {
    margin-right: 300px;
  }
`;

const DocsMain = styled.main`
  max-width: 800px;
  margin: 0 auto;

  word-break: break-word;
`;

const h1 = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;

  ${up('md')} {
    font-size: 2.5rem;
  }
`;

const h2 = styled.h2`
  font-weight: 600;
  font-size: 1.4rem;

  ${up('md')} {
    font-size: 1.4rem
  }
`;

const h3 = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;

  ${up('md')} {
    font-size: 1.2rem
  }
`;

const h4 = styled.h4`
  font-weight: 600;

  font-size: 1.1rem;

  ${up('md')} {
    font-size: 1.1rem
  }
`;

const hr = styled.hr`
  margin: 2em 0;
`;

const code = styled.code`
  display: block;
  background-color: #333;
  color: #fefefe;
  border-radius: 0.5em;
  padding: 1.5em;
`;

const TableWrapper = styled.div`  
  overflow-y: scroll;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  margin-top: 1em;
  margin-bottom: 2em;
  border-radius: 0.5em;

  table {
    width: 100%;
    thead tr {
      border-bottom: 1px solid #ccc;
    }

    tbody tr:nth-child(odd) {
      background-color: #f9f9f9;
    }

    th,
    td {
      padding: 0.75em;
      min-width: 100px;
    }
  }
`;

const a = (props: { href: string; children: JSX.Element }) => {
  return (
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  );
};

const table = (props: { children: JSX.Element }) => {
  return (
    <TableWrapper>
      <table>{props.children}</table>
    </TableWrapper>
  );
};

const RapidaDocs = ({ source, currentPage, pages, packages }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = {
    h1,
    h2,
    h3,
    h4,
    hr,
    code,
    a,
    table,
  };

  return (
    <div>
      <DocsTopNav
        currentPage={currentPage}
        open={sidebarOpen}
        setOpen={(open: boolean) => setSidebarOpen(open)}
      />
      <DocsContainer>
        <DocsSidebar
          currentPage={currentPage}
          pages={pages}
          packages={packages}
          open={sidebarOpen}
          setOpen={(open: boolean) => setSidebarOpen(open)}
        />
        <DocsMainWrapper>
          <DocsMain>
            <MDXRemote {...source} components={components} />
          </DocsMain>
        </DocsMainWrapper>
      </DocsContainer>
    </div>
  );
};

export default RapidaDocs;

const getAllFiles = (directory: string): string[] => {
  const files: string[] = [];

  const explore = (directory: string) => {
    fs.readdirSync(directory).forEach((file) => {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) return explore(absolute);
      else return files.push(absolute);
    });
  };

  explore(directory);

  return files;
};

const getAllPagesForPackage = (packageName: string): Page[] => {
  const cwd = process.cwd();

  const fileNames = getAllFiles(
    path.join(cwd, `generated/docs/${packageName}`)
  ).filter((f) => /(.*).md/.test(f));

  const pages: Page[] = [];

  fileNames.forEach((fileName) => {
    const relativePath = fileName.replace(`${cwd}/generated/docs/`, '');

    const splitName = relativePath.split('/');

    const folder = splitName.length > 2 ? splitName[1] : '';

    const name = splitName[splitName.length - 1].replace('.md', '');

    const slug = splitName
      .slice(1, splitName.length)
      .join('~')
      .replace('.md', '');

    pages.push({
      name,
      folder,
      slug,
      relativePath,
      href: `/docs/${packageName}/${slug}`,
      absolutePath: fileName,
      packageName,
    });
  });

  return pages;
};

export const getStaticPaths = async () => {
  const paths: {
    params: {
      package: string;
      slug: string;
    };
  }[] = [];

  allPackages.forEach(({ slug: packageName }) => {
    const pages = getAllPagesForPackage(packageName);

    pages.forEach((page) => {
      paths.push({
        params: {
          package: packageName,
          slug: page.slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

const rewriteLinks = (
  currentPage: Page,
  pages: Page[],
  markdown: string
): string => {
  let transformed = markdown;

  // replace links for the current page with relative anchor links
  const linksRegExp = /\[(.*?)\]\((.*?)\)/gm;
  const links = markdown.match(linksRegExp);

  if (links) {
    links.forEach((originalLink) => {
      // if the link is not external
      if (!/http[s]?.*/.test(originalLink)) {
        const namePart = originalLink.match(/\[.*\]/)![0];
        const hrefPart = originalLink
          .match(/\(.*\)/)![0]
          .replace('(', '')
          .replace(')', '')
          .replace('.md', '');

          
          // change relative link to absolute link
        const splitHref = hrefPart.split('/');
        const splitCurrentPath = currentPage.relativePath.split('/');

        let path = splitCurrentPath.slice(0, splitCurrentPath.length - 1);

        for (let item of splitHref) {
          if (item === '..') {
            path = path.slice(0, path.length - 1);
          } else {
            path.push(item);
          }
        }

        const newHref = `/docs/${path[0]}/${path
          .slice(1, path.length)
          .join('~')}`;

        // construct the new link
        const newLink = `${namePart}(${newHref})`;
        transformed = transformed.replace(originalLink, newLink);
      }
    });
  }

  return transformed;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const packageName = context.params?.package as string | undefined;
  if (
    packageName === undefined ||
    !allPackages.map((p) => p.slug).includes(packageName)
  ) {
    throw new Error(`invalid package name ${packageName}`);
  }

  const slug = context.params?.slug;
  if (slug === undefined) {
    throw new Error('no slug');
  }

  const pages = getAllPagesForPackage(packageName);

  const page = pages.find((p) => p.slug === slug);

  if (page === undefined) {
    throw new Error(`page with slug ${slug} not found`);
  }

  const markdown = fs.readFileSync(page.absolutePath, 'utf8');

  const transformedMarkdown = rewriteLinks(page, pages, markdown);

  const mdxSource = await serialize(transformedMarkdown, {
    mdxOptions: {
      rehypePlugins: [
        // @ts-expect-error typing issue
        rehypeSlug, // add IDs to any h1-h6 tag that doesn't have one, using a slug made from its text
      ],
    },
  });

  return {
    props: {
      pages,
      currentPage: page,
      source: mdxSource,
      packages: allPackages,
    } as Props,
  };
};
