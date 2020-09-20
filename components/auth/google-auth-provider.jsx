import React, { useContext } from 'react';
import { Button } from "antd";
import { UserContext } from "contexts/user-context";

function GoogleAuthProvider(props) {
  const { handleSignInWithGoogle } = useContext(UserContext);
  return (
    <Button onClick={() => handleSignInWithGoogle()}>Sign in with Google</Button>
  );
}

export default GoogleAuthProvider;