import React, { useEffect, useState } from 'react';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { allPackages } from '../../constants/all-packages';
import { Page } from '../../types/docs/page';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  overflow-y: scroll;

  transform: translateX(-110vw);
  transition: transform 0.3s ease;

  &.open {
    transform: none;
  }

  ${up('md')} {
    height: 100vh;
    width: 300px;

    transform: unset;
    transition: unset;
  }
`;

const SidebarDiv = styled.div`
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding-top: 4em;
  height: 100vh;
  width: 300px;

  img {
    width: 150px;
    filter: drop-shadow(-3px -3px 6px rgba(0, 0, 0, 0.5));
  }
`;

const SidebarLinks = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #fff;

  border-right: 1px solid #ccc;

  ${up('md')} {
    border-right: none;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    width: 100%;
  }
`;

const FolderItem = styled.li`
  position: relative;
  width: 100%;
  border-radius: 0.25em;

  background-color: #fefefe;
  color: #333;
  font-size: 0.85rem;
  letter-spacing: 0.1rem;
  text-transform: capitalize;
  cursor: pointer;
  transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;

  &.current {
    background-color: #eee;
  }

  &:hover {
    color: #555;
    background-color: #f9f9f9;
  }

  a {
    display: block;
    padding: 0.5em 1.5em;
    color: inherit;
    text-decoration: none;
  }
`;

const FolderName = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 0.5em 1.5em;
`;

const Folder = styled.div`
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
`;

const SectionName = styled.div`
  font-family: ${(p) => p.theme.fonts.rapida};
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.5em 1.3em;
`;

const CurrentPackage = styled.a`
  width: 100%;
  padding: 0.5em 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 0.5em;
  background: #222;
  color: #eee;
  text-decoration: none;
  font-family: ${(p) => p.theme.fonts.rapida};
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;

  &:hover {
    color: #ccc;
  }
`;

const apiFolderOrder = ['', 'classes', 'enums', 'interfaces'];

type Props = {
  packages: typeof allPackages;
  currentPage: Page;
  pages: Page[];
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DocsSidebar = ({
  pages,
  currentPage,
  packages,
  open,
  setOpen,
}: Props) => {
  const [apiPagesByFolder, setApiPagesByFolder] =
    useState<{ [folder: string]: Page[] }>();

  const [docsPagesByFolder, setDocsPagesByFolder] =
    useState<{ [folder: string]: Page[] }>();

  useEffect(() => {
    const _apiPagesByFolder: {
      [folder: string]: Page[];
    } = {};
    const _docsPagesByFolder: {
      [folder: string]: Page[];
    } = {};

    pages.forEach((page) => {
      let section: { [folder: string]: Page[] };
      if (
        page.name === 'modules' ||
        ['classes', 'enums', 'interfaces'].includes(page.folder)
      ) {
        section = _apiPagesByFolder;
      } else {
        section = _docsPagesByFolder;
      }

      if (section[page.folder] === undefined) {
        section[page.folder] = [];
      }

      section[page.folder].push(page);
    });

    setApiPagesByFolder(_apiPagesByFolder);
    setDocsPagesByFolder(_docsPagesByFolder);
  }, [pages, packages, currentPage]);

  return (
    <SidebarWrapper
      className={`${open ? 'open' : 'closed'}`}
      onClick={() => setOpen(false)}
    >
      <SidebarDiv onClick={(e) => e.stopPropagation()}>
        <SidebarLinks>
          <CurrentPackage href={`/docs/${currentPage.packageName}/README`}>
            {currentPage.packageName}
          </CurrentPackage>
          {apiPagesByFolder !== undefined && docsPagesByFolder !== undefined ? (
            <>
              <Section>
                <SectionName>Docs</SectionName>
                {Object.entries(docsPagesByFolder).map(
                  ([folder, pagesInFolder]) => (
                    <Folder key={folder}>
                      {folder ? <FolderName>{folder}</FolderName> : undefined}
                      <ul>
                        {pagesInFolder.map((page) => (
                          <FolderItem
                            key={page.absolutePath}
                            className={
                              page.href === currentPage.href ? 'current' : ''
                            }
                          >
                            <a href={page.href}>{page.name}</a>
                          </FolderItem>
                        ))}
                      </ul>
                    </Folder>
                  )
                )}
              </Section>
              <Section>
                <SectionName>API Docs</SectionName>
                {apiFolderOrder.map((folder) =>
                  apiPagesByFolder[folder] !== undefined ? (
                    <Folder key={folder}>
                      {folder ? <FolderName>{folder}</FolderName> : undefined}
                      <ul>
                        {apiPagesByFolder[folder].map((page) => (
                          <FolderItem
                            key={page.absolutePath}
                            className={
                              page.href === currentPage.href ? 'current' : ''
                            }
                          >
                            <a href={page.href}>{page.name}</a>
                          </FolderItem>
                        ))}
                      </ul>
                    </Folder>
                  ) : undefined
                )}
              </Section>
            </>
          ) : undefined}
        </SidebarLinks>
      </SidebarDiv>
    </SidebarWrapper>
  );
};
