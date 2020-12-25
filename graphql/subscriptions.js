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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      items {
        items {
          id
          wishlistID
          name
          link
          photoURL
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        items {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      name
      link
      photoURL
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        items {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      name
      link
      photoURL
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        items {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      name
      link
      photoURL
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      type
      createdAt
      action
      userID
      wishlistID
      initiatingUserID
      receivingUserID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      type
      createdAt
      action
      userID
      wishlistID
      initiatingUserID
      receivingUserID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      type
      createdAt
      action
      userID
      wishlistID
      initiatingUserID
      receivingUserID
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
