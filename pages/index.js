import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "utils/firebase";
import "firebase/firebase-database";
import Wishlist from "components/list";

export default function Home() {
  const firebase = useContext(FirebaseContext);
  const [stuff, setStuff] = useState(null);
  const database = firebase.database().ref()

  database.once('value').then((snapshot) => console.log(snapshot.val()));

  console.log({ database });
  return <div>
   <h1>Hello World</h1>
    <Wishlist />
  </div>
}
