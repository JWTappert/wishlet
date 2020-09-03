import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "utils/firebase";
import "firebase/firebase-database";
import Wishlist from "components/list";

export default function Home() {
  const firebase = useContext(FirebaseContext);
  const [wishlist, setWishlist] = useState(null);

  // this is a wishlist guid
  const ref = firebase.database().ref(`wishlists/4f08dedf-dd17-4327-9da3-121abef7c53a`)

  useEffect(() => {
    ref.once('value').then((snapshot) => {
      if (!snapshot) {
        setWishlist([]);
      } else {
        const tempList = [];
        snapshot.forEach(item => {
          tempList.push({ ...item.val() })
          setWishlist(tempList);
        })
      }
    }).catch((err) => console.error(err));
  }, []);

  return <div>
   <h1>Hello World</h1>
    <Wishlist wishlist={wishlist} />
  </div>
}
