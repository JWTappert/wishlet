import React from "react";
import styled from "styled-components";
import Wishlet from "public/wishlet.svg";

function WishletIcon() {
  return <Logo />
}

const Logo = styled(Wishlet)`
  fill: #fff;
  stroke: #FC8F1A;
  
  &:hover {
    cursor: pointer;
  }
`;

export default WishletIcon;