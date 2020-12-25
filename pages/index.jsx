import React, {useState, useContext} from "react";
import styled from "styled-components";
import Card from "../components/card";
import {EventContext} from "../contexts/event-context";

export default function Home() {
  const eventState = useContext(EventContext);
  const [events,] = useState(eventState.events);
  
  return (
      <Container>
        <Title>Recent Activity</Title>
        {events.length ? events?.map(event => <Card event={event} />) : <p>no events...</p>}
      </Container>
  );
}

const Title = styled.h1``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
