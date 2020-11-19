/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWishlist = /* GraphQL */ `
  query GetWishlist($id: ID!) {
    getWishlist(id: $id) {
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
export const listWishlists = /* GraphQL */ `
  query ListWishlists(
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWishlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wishlistID
        wishlist {
          id
          name
          userID
          createdAt
          updatedAt
        }
        name
        link
        photoURL
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
