import React from 'react';

import * as Nature from './NatureStyles';
import CampfireImage from '../image/campfire-marko-horvat-unsplash.jpg';

function InfoWithPhoto() {
  return (
    <Nature.MainContainerFlex>
      <Nature.ImageContainerMedium className="info-photo">
        <Nature.IMGMedium src={CampfireImage} alt="A campfire, by Marko Horvat on Unsplash" className="owner-info__photo" />
      </Nature.ImageContainerMedium>
      <div className="info-text">
        <h2>이름 or 닉네임</h2>
        <p>자기소개 문장 들어가는 자리입니다</p>
        <ul>
          <li>이력 or 특이사항 1</li>
          <li>이력 or 특이사항 1</li>
          <li>이력 or 특이사항 1</li>
          <li>이력 or 특이사항 1</li>
        </ul>
      </div>
    </Nature.MainContainerFlex>
  )
}

export default InfoWithPhoto;