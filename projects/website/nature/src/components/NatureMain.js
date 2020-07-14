import React from 'react';

import Carousel from './Carousel';
import InfoWithPhoto from './InfoWithPhoto';
import NatureForm from './NatureForm';

import * as Nature from './NatureStyles';

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

      <Nature.MainSection className="intro-message">
        <Nature.MainContainer>
          <h2>숲내음 한껏 느끼며</h2>
          <p>
            자연휴양림에서 맑은 공기와 함께 맛있는 음식과 휴식을 즐기세요!
          </p>
        </Nature.MainContainer>
      </Nature.MainSection>

      <Nature.MainSectionReverse className="info">
        <InfoWithPhoto />
      </Nature.MainSectionReverse>

      <Nature.MainSection className="inquiry">
        <Nature.MainContainer>
          <div className="text-container">
            <h2>문의</h2>
            <p>자연휴양림 관련 궁금하신 점이 있으시면 알려주세요</p>
          </div>
          <NatureForm formContent={formContent} hasSubmit={false} />
        </Nature.MainContainer>
      </Nature.MainSection>
    </main>
  );
}

export default NatureMain;
