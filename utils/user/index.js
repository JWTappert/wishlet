import cookies from "js-cookie";

const getUserFromCookie = () => {
  const cookie = cookies.get('auth')
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

const setUserCookie = (user) => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

const removeUserCookie = () => cookies.remove('auth')

const getUserFromCredential = (credential) => {
  const { uid, email, xa } = credential;
  return {
    uid,
    email,
    token: xa,
  }
};

const getUserFromGoogleOAuthResponse = ({user, credential}) => {
  const { uid, email } = user;
  const { accessToken } = credential;
  return {
    uid,
    email,
    token: accessToken
  }
}

export { getUserFromCredential, getUserFromGoogleOAuthResponse, setUserCookie, removeUserCookie, getUserFromCookie };