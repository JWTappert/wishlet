/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      displayName
      email
      photoURL
      website
      facebook
      instagram
      twitter
      youtube
      wishlists {
        items {
          id
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      displayName
      email
      photoURL
      website
      facebook
      instagram
      twitter
      youtube
      wishlists {
        items {
          id
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      displayName
      email
      photoURL
      website
      facebook
      instagram
      twitter
      youtube
      wishlists {
        items {
          id
          name
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWishlist = /* GraphQL */ `
  subscription OnCreateWishlist {
    onCreateWishlist {
      id
      name
      userID
      user {
        id
        name
        displayName
        email
        photoURL
        website
        facebook
        instagram
        twitter
        youtube
        wishlists {
          nextToken
        }
        createdAt
        updatedAt
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWishlist = /* GraphQL */ `
  subscription OnUpdateWishlist {
    onUpdateWishlist {
      id
      name
      userID
      user {
        id
        name
        displayName
        email
        photoURL
        website
        facebook
        instagram
        twitter
        youtube
        wishlists {
          nextToken
        }
        createdAt
        updatedAt
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWishlist = /* GraphQL */ `
  subscription OnDeleteWishlist {
    onDeleteWishlist {
      id
      name
      userID
      user {
        id
        name
        displayName
        email
        photoURL
        website
        facebook
        instagram
        twitter
        youtube
        wishlists {
          nextToken
        }
        createdAt
        updatedAt
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      wishlistID
      wishlist {
        id
        name
        userID
        user {
          id
          name
          displayName
          email
          photoURL
          website
          facebook
          instagram
          twitter
          youtube
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      link
      photoURL
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      wishlistID
      wishlist {
        id
        name
        userID
        user {
          id
          name
          displayName
          email
          photoURL
          website
          facebook
          instagram
          twitter
          youtube
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      link
      photoURL
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      wishlistID
      wishlist {
        id
        name
        userID
        user {
          id
          name
          displayName
          email
          photoURL
          website
          facebook
          instagram
          twitter
          youtube
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      link
      photoURL
      createdAt
      updatedAt
    }
  }
`;
