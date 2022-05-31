import React from 'react';
import styled from 'styled-components';

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    font-family ${(p) => p.theme.fonts.rapida}
  }

  a:not(:first-child) {
    margin-left: 1.5em;
  }
`;

export const FindUs = () => (
  <Links>
    <a href="https://gitlab.com/rapidajs/rapida">GitLab</a>
    <a href="https://github.com/rapidajs/rapida">GitHub (mirror)</a>
    <a href="https://www.npmjs.com/package/@rapidajs/recs">NPM</a>
  </Links>
);
