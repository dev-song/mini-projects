import React from "react";
import styled from "styled-components";

function NatureHeader(props) {
  const data = {
    background: props.background || "transparent",
    brandName: "Nature",
    brandLogoUrl: "#",
    linkInfo: [
      { name: "Home", url: "" },
      { name: "About", url: "" },
      { name: "Contact", url: "" },
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

  const Figure = styled.figure`
    display: flex;
    margin: 0;
  `;

  const BrandName = styled.h1`
    margin: 0 1rem;
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
    <NavigationItem className='nav-link' key={index}>
      <NavigationLink href={link.url}>{link.name}</NavigationLink>
    </NavigationItem>
  ));

  return (
    <Header>
      <HeaderContainer>
        <Figure className='brand-info'>
          <img
            className='brand-info__brand-logo'
            src={data.brandLogoUrl}
            alt='Brand Logo'
          />
          <BrandName className='brand-info__brand-name'>
            {data.brandName}
          </BrandName>
        </Figure>
        <Navigation className='nav-bar'>{linkList}</Navigation>
      </HeaderContainer>
    </Header>
  );
}

export default NatureHeader;
