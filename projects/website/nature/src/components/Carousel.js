import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// inspired by 'Making Carousel with React Hooks' tutorial by peppermint100
// https://medium.com/@krpeppermint100/js-react-hooks%EB%A1%9C-carousel-slider-%EB%A7%8C%EB%93%A4%EA%B8%B0-2e558151bbee
import Slide from "./ImageSlide";
import sampleImg1 from "../image/chungsong_forest_002.jpg";
import sampleImg2 from "../image/chungsong_forest_006.jpg";
import sampleImg3 from "../image/chungsong_forest_007.jpg";
import sampleImg4 from "../image/gumbong_forest_003.jpg";

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
`;

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SliderCounter = styled.span`
  display: inline-block;
  padding: 0 1em;
`;

const TOTAL_SLIDES = 3; // 4개의 이미지이므로 0 ~ 3 index
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) setCurrentSlide(0);
    // 마지막 슬라이드일 경우 첫 슬라이드로
    else setCurrentSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    if (currentSlide === 0) setCurrentSlide(TOTAL_SLIDES);
    // 첫 슬라이드일 경우 마지막 슬라이드로
    else setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        <Slide img={sampleImg1} />
        <Slide img={sampleImg2} />
        <Slide img={sampleImg3} />
        <Slide img={sampleImg4} />
      </SliderContainer>
      <Button onClick={prevSlide}>Previous Slide</Button>
      <SliderCounter>{currentSlide}</SliderCounter>
      <Button onClick={nextSlide}>Next Slide</Button>
    </Container>
  );
}

export default Carousel;
