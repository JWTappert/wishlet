import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getUserProfile,
  getWishlistsForUser,
  addWishlist,
  addItemToWishlist,
} from "utils/firebase";
import { useRouter } from "next/router";
import { ProfileLayout } from "components/profile";

export default function Profile() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState({});
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    getUserProfile(uid)
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, [uid]);

  useEffect(() => {
    getWishlistsForUser(uid)
      .then((wishlists) => setWishlists(wishlists))
      .catch((error) => console.error(error));
  }, [wishlists]);

  function handleWishlistAdded(name) {
    return new Promise((resolve, reject) => {
      addWishlist(user.uid, name)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  function handleItemAdded(wishlistId, item) {
    return new Promise((resolve, reject) => {
      addItemToWishlist(wishlistId, item)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  return (
    <ProfileLayout
      user={user}
      wishlists={wishlists}
      handleWishlistAdded={handleWishlistAdded}
      handleItemAdded={handleItemAdded}
    />
  );
}
