import React from "react";
import styled from "styled-components";

function Card({ event }) {
  return (
    <CardContainer>
      <h1>{event.title}</h1>
      <p>{event.createdAt}</p>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  min-height: 100px;
  background: #FFFFFF;
  border: 1px solid #D3D8DE;
  box-sizing: border-box;
  box-shadow: 1px 2px 3px rgba(37, 37, 37, 0.075719);
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
`;

export default Card;