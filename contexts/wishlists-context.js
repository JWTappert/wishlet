import React, { createContext } from "react";
import useWishlists from "hooks/use-wishlists";
import { useRouter } from "next/router";

export const WishlistsContext = createContext([]);

export const WishlistsProvider = ({ children }) => {
  const router = useRouter();
  const { uid } = router.query;
  const [wishlists, setWishlists] = useWishlists(uid);
  console.log({ wishlists });

  const addWishlist = (wishlist) => {};

  return (
    <WishlistsContext.Provider value={{ wishlists, addWishlist }}>
      {children}
    </WishlistsContext.Provider>
  );
};
