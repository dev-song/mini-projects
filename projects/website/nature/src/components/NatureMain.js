import React from 'react';
import styled from 'styled-components';

import Carousel from './Carousel';

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
`;

function NatureMain() {
  return (
    <Main>
      <Section className="intro-images">
        <Carousel />
      </Section>
      <Section className="intro-message">
        <h2>휴양림의 매력에 빠져보세요!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          vitae?
        </p>
      </Section>
    </Main>
  );
}

export default NatureMain;
