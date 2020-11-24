import React, {useState} from "react";
import styled from "styled-components";
import {signIn, signOut} from "utils/aws/auth";

export default function Test() {
  const [user, setUser] = useState();
  async function handleSignIn() {
    const result  = await signIn('justin.tappert@dutchie.com', 'password');
    setUser(result);
  }

  return (
    <Container>
      <p>Here!</p>
        <h1>Private content</h1>
        {user ? (
          <p>email: {user.email}</p>
        ): (
          <p>no user</p>
        )}
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
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