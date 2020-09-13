import React, { useState, useEffect } from "react";
import firebase from "utils/firebase";

const useWishlists = (uid) => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWishlistsForUser = (uid) => {
    if (!uid) return;
    return firebase
      .firestore()
      .collection("wishlists")
      .where("uid", "==", uid)
      .onSnapshot(
        (querySnapshot) => {
          const wishlists = [];
          querySnapshot.forEach((doc) =>
            wishlists.push({ id: doc.id, ...doc.data() })
          );
          setWishlists(wishlists);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setWishlists([]);
    const unsubscribe = getWishlistsForUser(uid);
    return () => {
      unsubscribe();
    };
  }, []);

  return [wishlists, loading, error];
};

export default useWishlists;
