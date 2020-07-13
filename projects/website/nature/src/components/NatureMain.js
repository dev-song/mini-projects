import React from 'react';
import styled from 'styled-components';

import Carousel from './Carousel';
import NatureForm from './NatureForm';

import * as CommonStyles from './NatureStyles';

const MainContainer = styled.div`
max-width: 1200px;
margin: auto;
`;

const MainSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 4rem 2rem;

  background: ${CommonStyles.BACKGROUND_COLOR};
  color: ${CommonStyles.COLOR};
`;

const MainSectionReverse = styled(MainSection)`
background: ${CommonStyles.COLOR};
color: ${CommonStyles.BACKGROUND_COLOR};
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
    }
  ];

  return (
    <main role="main">
      <Carousel className="intro-carousel" />
      <MainSection className="intro-message">
        <MainContainer>
          <h2>휴양림의 매력에 빠져보세요!</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            vitae?
          </p>
        </MainContainer>
      </MainSection>
      <MainSectionReverse className="owner-info">
        <MainContainer>
          <figure className="owner-info__photo-container">
            <img src="" alt="" className="owner-info__photo" />
          </figure>
        </MainContainer>
      </MainSectionReverse>
      <MainSection className="inquiry">
        <MainContainer>

          <NatureForm formContent={formContent} hasSubmit={false} />
        </MainContainer>
      </MainSection>
    </main>
  );
}

export default NatureMain;
