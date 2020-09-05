import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {getUserProfile} from "utils/firebase";
import {useRouter} from "next/router";
import {ProfileLayout} from "components/profile";

export default function Profile() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfile(uid).then(snapshot => {
      const user = {
        uid: snapshot.key,
        ...snapshot.val()
      }
      setUser(user);
    })
      .catch(error => console.error(error));
  });

  return (
    <ProfileLayout user={user} />
  )
}

const Container = styled.div`
  margin: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;