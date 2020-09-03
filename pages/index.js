import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "utils/firebase";
import "firebase/firebase-database";
import Wishlist from "components/list";

export default function Home() {
  const firebase = useContext(FirebaseContext);
  const [wishlist, setWishlist] = useState([]);

  // this is a wishlist guid
  const listRef = firebase.database().ref(`wishlists/4f08dedf-dd17-4327-9da3-121abef7c53a`)

  useEffect(() => {
    listRef.once('value').then((snapshot) => {
      if (!snapshot) {
        setWishlist([]);
      } else {
        const tempList = [];
        snapshot.forEach((item, index) => {
          tempList.push({ key: index,  ...item.val() })
        });
        setWishlist(tempList);
      }
    }).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    listRef.on('child_added', (data) => {
      setWishlist(prevState => [...prevState, data.val() ]);
    });
  }, [firebase]);

  function addItem() {
    // const newListItem = listRef.push();
    // newListItem.set({
    //   name: 'SVG Animations: From Common UX Implementations to Complex Responsive Animation',
    //   image: 'https://m.media-amazon.com/images/I/51iV+wxhw9L._SS135_.jpg',
    //   price: 42.99,
    //   category: 'book',
    //   subcategory: 'technology'
    // });
  }

  return <div>
   <h1>Hello World</h1>
    <Wishlist wishlist={wishlist} handleAddItem={addItem} />
  </div>
}
