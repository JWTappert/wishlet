import React, { useContext } from "react";
import {UserContext} from "utils/firebase";

export default function Profile() {
  const user = useContext(UserContext)
  return (
    <h1>{user.email}</h1>
  )
}