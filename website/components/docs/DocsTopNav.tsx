import { Menu } from '@styled-icons/material';
import React from 'react';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { Page } from '../../types/docs/page';

const MenuIcon = styled(Menu)`
  width: 100%;
`;

const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.a`
  font-size: 1.2rem;
  font-weight: 400;
  margin-right: 0.5em;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #333;
  }

  strong {
    font-family: ${(p) => p.theme.fonts.rapida};
    font-weight: 600;
  }
`;

const MenuIconButton = styled.button`
  ${up('md')} {
    display: none;
  }

  width: 45px;
  height: 45px;
  padding: 0.5em;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    display: block;
    width: 100%;
    height: 100%;

    transform: scale(1);
    transition: background 0.3s ease, transform 0.3s ease;
  }
`;

const TopNavWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4em;

  padding: 0.5em 1.5em;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  background-color: #fff;
  color: #333;
  transition: color 0.3s ease;

  ${MenuIcon} {
    z-index: 100;
  }

  &:hover {
    color: #444;

    ${MenuIconButton} {
      &::before {
        ${up('xl')} {
          transform: scale(100%);
        }
      }
    }
  }
`;

type Props = {
  currentPage: Page;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DocsTopNav = ({ currentPage, open, setOpen }: Props) => {
  return (
    <>
      <TopNavWrapper className={`nav-toggle ${open ? 'open' : 'closed'}`}>
        <TopText>
          <TitleText href="/">
            <strong>rápida</strong> docs
          </TitleText>
        </TopText>
        <MenuIconButton onClick={() => setOpen(!open)} type="button">
          <MenuIcon />
        </MenuIconButton>
      </TopNavWrapper>
    </>
  );
};
