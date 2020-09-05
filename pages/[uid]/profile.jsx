import React, { useContext } from "react";
import {UserContext} from "utils/firebase";

export default function Profile() {
  const user = useContext(UserContext)
  console.log('profile user', user);
  return (
    <h1>{user.email}</h1>
  )
}