/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createWishlist = /* GraphQL */ `
  mutation CreateWishlist(
    $input: CreateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    createWishlist(input: $input, condition: $condition) {
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
export const updateWishlist = /* GraphQL */ `
  mutation UpdateWishlist(
    $input: UpdateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    updateWishlist(input: $input, condition: $condition) {
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
export const deleteWishlist = /* GraphQL */ `
  mutation DeleteWishlist(
    $input: DeleteWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    deleteWishlist(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
