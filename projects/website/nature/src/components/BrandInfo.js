import React from "react";
import styled from "styled-components";

function BrandInfo() {
  const data = {
    brandName: "Nature",
    brandLogoUrl: "#",
  };

  const Figure = styled.figure`
    display: flex;
    margin: 0;
  `;

  const BrandName = styled.h1`
    margin: 0 1rem;
  `;

  return (
    <Figure className='brand-info'>
      <img
        className='brand-info__brand-logo'
        src={data.brandLogoUrl}
        alt='Brand Logo'
      />
      <BrandName className='brand-info__brand-name'>{data.brandName}</BrandName>
    </Figure>
  );
}

export default BrandInfo;
