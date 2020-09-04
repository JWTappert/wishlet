import 'firebase/auth'
import cookies from 'js-cookie'
import RegistrationForm from "./registration-form";

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

const mapUserData = (user) => {
  const { uid, email, xa } = user
  return {
    id: uid,
    email,
    token: xa,
  }
};

export { RegistrationForm, getUserFromCookie, setUserCookie, removeUserCookie, mapUserData, };