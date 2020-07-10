/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

import BrandInfo from './BrandInfo';

function NatureFooter(props) {
  const data = {
    background: props.background || 'trnasparent',
  };

  const Footer = styled.footer`
    width: 100%;
    background: ${data.background};
  `;

  const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    padding: 1rem 2rem;
  `;

  const ContactInfo = styled.div`
    margin: 0 0.5rem;
  `;

  const EmailAddress = styled.h4`
    margin: 0;
  `;

  const SocialNetwork = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <Footer>
      <FooterContainer>
        <BrandInfo />
        <ContactInfo>
          <EmailAddress>owner_email@gmail.com</EmailAddress>
          <SocialNetwork>Twitter, Facebook, LinkedIn</SocialNetwork>
        </ContactInfo>
      </FooterContainer>
    </Footer>
  );
}

export default NatureFooter;
