export const saveToken = (jwt) => {
  // save token to local storage, login user
  if(typeof window !== 'undefined')
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
};

export const removeToken = () => {
  // delete token, log user out
  if(typeof window !== 'undefined')
    sessionStorage.removeItem('jwt');
};

export const isAuthenticated = () => {
  if(typeof window === 'undefined') return false;
  
  // check if the user has a saved token
  if(sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt'));
  else
    return false;
};