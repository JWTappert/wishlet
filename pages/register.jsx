import React from "react";
import styled from "styled-components";
import {SignUpForm} from "components/auth";

export default function Register() {
  return (
    <Container>
     <SignUpForm />
    </Container>
  )
}

const Container = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;