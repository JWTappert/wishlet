import React, {useEffect} from "react";
import styled from "styled-components";
import Card from "../components/card";

export default function Home() {
  return (
    <Container>
      <Title>Recent Activity</Title>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
}

const Title = styled.h1``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
