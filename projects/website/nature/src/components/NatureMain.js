import React from 'react';
import styled from 'styled-components';

import Carousel from './Carousel';
import NatureForm from './NatureForm';

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
`;

const DescriptionContainer = styled.div`
  margin: 0;
  padding: 1rem;
`;

function NatureMain() {
  const formContent = [
    {
      contentName: "name",
      content: "이름",
      type: "text",
      required: true
    },
    {
      contentName: "phone",
      content: "전화번호",
      type: "text",
      required: false
    },
    {
      contentName: "email",
      content: "이메일",
      type: "email",
      required: true
    },
    {
      contentName: "message",
      content: "문의 내용",
      type: "textarea",
      required: true
    },
    {
      contentName: "test",
      content: "문의 내용",
      type: "bvklasldfkjslk",
      required: true
    }
  ];

  return (
    <Main>
      <Carousel />
      <Section className="intro-message">
        <h2>휴양림의 매력에 빠져보세요!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          vitae?
        </p>
      </Section>
      <Section className="owner-info">
        <figure className="owner-info__photo-container">
          <img src="" alt="" className="owner-info__photo" />
        </figure>
        <DescriptionContainer className="owner_info__description-container">

        </DescriptionContainer>
      </Section>
      <Section className="inquiry">
        <DescriptionContainer className="inquiry__description-container">

        </DescriptionContainer>
        <NatureForm formContent={formContent} hasSubmit={false}/>
      </Section>
    </Main>
  );
}

export default NatureMain;
