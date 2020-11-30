import { serialize } from "./serializer"

test('serializer', () => {
  const User = serialize(user);
  expect(User.profile).toEqual({
    id: "47e12680-8af6-4d05-98ae-3223d057603b",
    name: "Tester!",
    displayName: "t e s t i n g",
    email: "tester@gmail.com",
    photoURL: null,
    website: null,
    facebook: null,
    instagram: null,
    twitter: null,
    youtube: null,
    createdAt: "2020-11-19T14:48:21.281Z",
    updatedAt: "2020-11-19T14:48:21.281Z"
  });

  expect(User.wishlists).toEqual({
    "e65adc2a-8e48-4354-b12f-339a05f6d820": {
      id: "e65adc2a-8e48-4354-b12f-339a05f6d820",
      name: "poop",
      userID: "47e12680-8af6-4d05-98ae-3223d057603b",
      updatedAt: "2020-11-29T02:49:03.058Z",
      items: {
        "64b2ba6d-0d27-4588-86e2-0e4be8d9e622": {
          createdAt: "2020-11-29T16:31:51.147Z",
          id: "64b2ba6d-0d27-4588-86e2-0e4be8d9e622",
          link: "test",
          name: "test",
          photoURL: null,
          updatedAt: "2020-11-29T16:31:51.147Z",
          wishlistID: "d56217ce-01c0-443a-801a-7e58729ee590",
        }
      },
    },
    "919896f8-6719-432d-80ed-87a9fdf8a385": {
      id: "919896f8-6719-432d-80ed-87a9fdf8a385",
      name: "test",
      userID: "47e12680-8af6-4d05-98ae-3223d057603b",
      updatedAt: "2020-11-29T02:48:00.865Z",
      items: {}
    }
  });
});

const user = {
  id: "47e12680-8af6-4d05-98ae-3223d057603b",
  name: "Tester!",
  displayName: "t e s t i n g",
  email: "tester@gmail.com",
  photoURL: null,
  website: null,
  facebook: null,
  instagram: null,
  twitter: null,
  youtube: null,
  wishlists: {
    items: [
      {
        id: "e65adc2a-8e48-4354-b12f-339a05f6d820",
        name: "poop",
        userID: "47e12680-8af6-4d05-98ae-3223d057603b",
        updatedAt: "2020-11-29T02:49:03.058Z",
        items: {
          items: [
            {
              createdAt: "2020-11-29T16:31:51.147Z",
              id: "64b2ba6d-0d27-4588-86e2-0e4be8d9e622",
              link: "test",
              name: "test",
              photoURL: null,
              updatedAt: "2020-11-29T16:31:51.147Z",
              wishlistID: "d56217ce-01c0-443a-801a-7e58729ee590"
            }
            ]
        }
      },
      {
        id: "919896f8-6719-432d-80ed-87a9fdf8a385",
        name: "test",
        userID: "47e12680-8af6-4d05-98ae-3223d057603b",
        updatedAt: "2020-11-29T02:48:00.865Z",
        items: {
          items: []
        }
      }
    ]
  },
  createdAt: "2020-11-19T14:48:21.281Z",
  updatedAt: "2020-11-19T14:48:21.281Z"
};
