import React from 'react';
import styled from 'styled-components';

import BrandInfo from './BrandInfo';

function NatureHeader(props) {
  const data = {
    background: props.background || 'transparent',
    linkInfo: [
      { name: 'Home', url: '' },
      { name: 'About', url: '' },
      { name: 'Contact', url: '' },
    ],
  };

  const Header = styled.header`
    width: 100%;
    background: ${data.background};
  `;

  const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    padding: 1rem 2rem;
  `;

  const Navigation = styled.ul`
    display: flex;
  `;

  const NavigationItem = styled.li`
    margin: 0 0.5rem;
    list-style: none;
  `;

  const NavigationLink = styled.a`
    text-decoration: none;
    color: black;
  `;

  const linkList = data.linkInfo.map((link, index) => (
    <NavigationItem className="nav-link" key={index}>
      <NavigationLink href={link.url}>{link.name}</NavigationLink>
    </NavigationItem>
  ));

  return (
    <Header>
      <HeaderContainer>
        <BrandInfo />
        <Navigation className="nav-bar">{linkList}</Navigation>
      </HeaderContainer>
    </Header>
  );
}

export default NatureHeader;
