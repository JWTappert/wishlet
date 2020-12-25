import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Card from "../components/card";
import {getEvents} from "utils/aws/event";

export default function Home() {
  const [events, setEvents] = useState([]);
  
  async function fetchEvents() {
    const events =  await getEvents();
    setEvents(events.items || []);
  }
  
  useEffect(() => {
    fetchEvents();
  }, [])
  
  return (
    <Container>
      <Title>Recent Activity</Title>
      {events && events?.map(event => <Card event={event} />)}
    </Container>
  );
}

const Title = styled.h1``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
