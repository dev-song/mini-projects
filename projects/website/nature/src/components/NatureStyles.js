import styled from 'styled-components';

const BACKGROUND_COLOR = '#071909';
const COLOR = '#AEC5B6';

const MainSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 4rem 2rem;

  background: ${COLOR};
  color: ${BACKGROUND_COLOR};
`;

const MainSectionReverse = styled(MainSection)`
  background: ${BACKGROUND_COLOR};
  color: ${COLOR};
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const MainContainerFlex = styled(MainContainer)`
  display: flex;
`;

const ImageContainerMedium = styled.figure`
  display: flex;
  margin: 0;
  padding: 1rem;
`;

const IMGMedium = styled.img`
  width: 90%;
  height: 32rem;
  margin: auto;

  object-fit: cover;
  object-position: center;
`;

export {
  BACKGROUND_COLOR,
  COLOR,
  MainSection,
  MainSectionReverse,
  MainContainer,
  MainContainerFlex,
  ImageContainerMedium,
  IMGMedium
};