import React from 'react';
import styled from 'styled-components';

import BrandInfo from './BrandInfo';

import * as CommonStyles from './NatureStyles';

const Footer = styled.footer`
  width: 100%;
  background: ${CommonStyles.BACKGROUND_COLOR};
  color: ${CommonStyles.COLOR};
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

function NatureFooter() {

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
