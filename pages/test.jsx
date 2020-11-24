import React, { useContext } from "react";
import styled from "styled-components";
import {UserContext, UserProvider} from "contexts/user-context";
import {observer} from "mobx-react-lite";

const Test = observer(() => {
  const user = useContext(UserContext);
  return (
    <Container>
      {user ? (
        <p>loading: {JSON.stringify(user)}</p>
      ) : (
        <p>No user signed in</p>
      )}
    </Container>
  )
});

export default Test;

const Container = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;