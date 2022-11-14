import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    var obj ={token:null}
    return obj;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};

export const removeUserCookie = () => cookies.remove('auth');

export const getOnBoardFromCookie = () => {
  const cookie = cookies.get('cockpitOnboarding');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const setOnBoardCookie = token => {
  cookies.set('cockpitOnboarding', token);
};

export const removeOnBoardCookie = () => cookies.remove('cockpitOnboarding');