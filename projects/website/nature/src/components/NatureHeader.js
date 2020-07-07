import React from "react";
import styled from "styled-components";

class NatureHeader extends React.Component {
  state = {
    background: this.props.background || "transparent",
    brandName: "Nature",
    brandLogoUrl: "#",
    linkInfo: [
      { name: "Home", url: "" },
      { name: "About", url: "" },
      { name: "Contact", url: "" },
    ],
  };

  Header = styled.header`
    width: 100%;
    background: ${this.state.background};
  `;

  HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    padding: 1rem 2rem;
  `;

  Figure = styled.figure`
    display: flex;
    margin: 0;
  `;

  BrandName = styled.h1`
    margin: 0 1rem;
  `;

  Navigation = styled.ul`
    display: flex;
  `;

  NavigationItem = styled.li`
    margin: 0 0.5rem;
    list-style: none;
  `;

  NavigationLink = styled.a`
    text-decoration: none;
    color: black;
  `;

  brandNameStyle = {
    margin: "0 1rem",
  };

  render() {
    const linkList = this.state.linkInfo.map((link, index) => (
      <this.NavigationItem className='nav-link' key={index}>
        <this.NavigationLink href={link.url}>{link.name}</this.NavigationLink>
      </this.NavigationItem>
    ));

    return (
      <this.Header>
        <this.HeaderContainer>
          <this.Figure className='brand-info'>
            <img
              className='brand-info__brand-logo'
              src={this.state.brandLogoUrl}
              alt='Brand Logo'
            />
            <this.BrandName className='brand-info__brand-name'>
              {this.state.brandName}
            </this.BrandName>
          </this.Figure>
          <this.Navigation className='nav-bar'>{linkList}</this.Navigation>
        </this.HeaderContainer>
      </this.Header>
    );
  }
}

export default NatureHeader;
