import React from "react";
import { ProfileLayout } from "components/profile";
import { WishlistsProvider } from "../../contexts/wishlists-context";

export default function Profile() {
  return (
    <WishlistsProvider>
      <ProfileLayout />
    </WishlistsProvider>
  );
}
